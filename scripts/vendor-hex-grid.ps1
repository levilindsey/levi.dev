<#
.SYNOPSIS
    Rebuild hex-grid and mirror its build output into this repo's
    vendored copy at apps/hex-grid/public/.

.DESCRIPTION
    levi.dev does not build hex-grid; it ships a vendored snapshot of
    hex-grid's build output (see CLAUDE.md, "hex-grid vendoring"). This
    script is the only supported way to refresh that snapshot:

      1. Runs the full hex-grid gulp build in ..\hex-grid:
         `gulp --series clean data scripts styles`. --series matters:
         the `data` task deletes example/dist, which `scripts` and
         `styles` write into, and the gulp CLI runs listed tasks in
         parallel by default.
      2. Mirrors (robocopy /MIR) hex-grid/dist and the shipped parts of
         hex-grid/example into apps/hex-grid/public/. Files deleted in
         hex-grid are deleted here too.
      3. Removes vendored dirs that no longer ship (example/docs,
         example/gulp, the sitemap inject template) and verifies the
         merged data.min.json matches hex-grid's.

    Afterwards: review `git status`, commit, push to master; CI deploys.
    Nothing under apps/hex-grid/public/ is ever edited by hand. Edit
    hex-grid and re-run this.

.PARAMETER SkipBuild
    Mirror whatever hex-grid currently has in dist/ and example/dist/
    without rebuilding. Only useful right after a build.

.EXAMPLE
    npm run vendor
    .\scripts\vendor-hex-grid.ps1 -SkipBuild
#>
[CmdletBinding()]
param(
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false

$hex = Join-Path $env:USERPROFILE 'Repositories\hex-grid'
$levi = Split-Path -Parent $PSScriptRoot
$vendor = Join-Path $levi 'apps\hex-grid\public'

if (-not (Test-Path (Join-Path $hex 'gulpfile.js'))) {
    throw "hex-grid checkout not found at $hex"
}
if (-not (Test-Path (Join-Path $hex 'node_modules'))) {
    throw "hex-grid has no node_modules. Run npm install in $hex first (its postinstall runs bower)."
}

if (-not $SkipBuild) {
    Write-Host "[vendor] building hex-grid ($hex)"
    Push-Location $hex
    try {
        & npx gulp --series clean data scripts styles
        if ($LASTEXITCODE -ne 0) { throw "hex-grid gulp build failed (exit $LASTEXITCODE)" }
    } finally {
        Pop-Location
    }
}

# Outputs that must exist before mirroring; a partial build would
# otherwise be mirrored as deletions.
$required = @(
    'dist\hex-grid.min.js',
    'dist\hex-grid.min.css',
    'example\dist\data.min.json',
    'example\dist\sitemap.xml',
    'example\dist\hex-grid-example.min.js',
    'example\dist\hex-grid-example.min.css'
)
foreach ($rel in $required) {
    if (-not (Test-Path (Join-Path $hex $rel))) {
        throw "hex-grid build output missing: $rel (run without -SkipBuild)"
    }
}

# Mirrored exactly. Deliberately NOT vendored:
#   example/docs        design SVG masters (stale 2021 snapshots, 22 MB)
#   example/gulp        build tasks
#   example/sitemap.xml the 4-line inject template; the generated
#                       sitemap is example/dist/sitemap.xml
$mirrors = @(
    @{ Src = 'dist';            Dst = 'dist' },
    @{ Src = 'example\data';    Dst = 'example\data' },
    @{ Src = 'example\dist';    Dst = 'example\dist' },
    @{ Src = 'example\images';  Dst = 'example\images' },
    @{ Src = 'example\scripts'; Dst = 'example\scripts' },
    @{ Src = 'example\styles';  Dst = 'example\styles' }
)
foreach ($m in $mirrors) {
    $src = Join-Path $hex $m.Src
    $dst = Join-Path $vendor $m.Dst
    Write-Host ("[vendor] mirror {0} -> apps/hex-grid/public/{1}" -f $m.Src, ($m.Dst -replace '\\', '/'))
    & robocopy $src $dst /MIR /NFL /NDL /NJH /NJS /NP /R:2 /W:1 | Out-Null
    # robocopy exit codes 0-7 are success flags; 8 and up are failures.
    if ($LASTEXITCODE -ge 8) { throw "robocopy failed for $src (exit $LASTEXITCODE)" }
}
Copy-Item (Join-Path $hex 'example\index.html') (Join-Path $vendor 'example\index.html') -Force

foreach ($dead in @('example\docs', 'example\gulp', 'example\sitemap.xml')) {
    $p = Join-Path $vendor $dead
    if (Test-Path $p) {
        Write-Host "[vendor] removing no-longer-vendored $dead"
        Remove-Item $p -Recurse -Force
    }
}

# Verify the one file the runtime actually fetches.
$a = (Get-FileHash (Join-Path $hex 'example\dist\data.min.json') -Algorithm SHA1).Hash
$b = (Get-FileHash (Join-Path $vendor 'example\dist\data.min.json') -Algorithm SHA1).Hash
if ($a -ne $b) { throw "data.min.json mismatch after mirror ($a vs $b)" }

$posts = (Get-ChildItem (Join-Path $vendor 'example\data') -Directory).Count
Write-Host ("[vendor] ok: {0} posts, data.min.json {1}" -f $posts, $a.Substring(0, 10))
Write-Host "[vendor] changed files:"
& git -C $levi status --short -- apps/hex-grid
exit 0
