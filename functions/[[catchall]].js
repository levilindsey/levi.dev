// Cloudflare Pages Function — short-URL alias redirects.
//
// Functions run BEFORE static assets: this root catchall makes the
// generated _routes.json include "/*", so every request reaches a
// Function. More specific ones (functions/knotmaze/, functions/media/,
// ...) claim their paths first; this one sees the rest and falls
// through to the static site via context.next() when no alias
// matches. An alias therefore also shadows any static file under its
// path.
//
// Each entry below is a regex that matches a short-URL alias
// pattern (with synonyms, plurals, etc.) and the destination URL.
// To add a new short URL, append an entry. To match the body of
// the request path, the regex is applied to `url.pathname`.
//
// Every rx has the shape /^\/(alias|alias|...)(?:\/.*)?$/i: the alias
// is the path's leading segment, and EVERY alternative sits inside
// that one group. A top-level `|` splits the anchors off. Before
// 2026-10-11, the GGJ24/GGJ26 entries read `^\/(beans?)|(farts?)|...`,
// which matched "fart", "imagination", "pull-my-finger" anywhere in any
// path. Because Functions run first, that 301'd real static files such
// as /hex-grid/example/data/pull-my-finger/metadata.json.
//
// Ported from the legacy Express middleware at apps/redirects/routes.js
// (removed 2026-10; git history has it). This file is the only copy.

const REDIRECTS = [
	// Profiles.
	{
		rx: /^\/(github|codes?|repos?|repositories)(?:\/.*)?$/i,
		to: 'https://github.com/levilindsey',
	},
	{
		rx: /^\/(facebook)(?:\/.*)?$/i,
		to: 'https://facebook.com/levislindsey',
	},
	{
		rx: /^\/(twitter)(?:\/.*)?$/i,
		to: 'https://twitter.com/levisl',
	},
	{
		rx: /^\/(linkedin)(?:\/.*)?$/i,
		to: 'https://linkedin.com/in/levi-lindsey',
	},
	{
		rx: /^\/(youtube)(?:\/.*)?$/i,
		to: 'https://www.youtube.com/playlist?list=PLIuJN99AFOPSF3p4f0siFo22XiMXqijQU',
	},
	{
		rx: /^\/(itch(\.?io)?)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/',
	},
	{
		rx: /^\/(ludum-?dare|ld(jam)?|(game-?)?jam)(?:\/.*)?$/i,
		to: 'https://ldjam.com/users/ukulelefury/games',
	},
	{
		rx: /^\/(blog|devlog|log)(?:\/.*)?$/i,
		to: 'https://devlog.levi.dev',
	},
	{
		rx: /^\/(resume|cv|experience)(?:\/.*)?$/i,
		to: 'https://docs.google.com/document/d/1RKgxLzazYLZiIJq_sJpmKtBDtCvaEdlgs_rUBd-ZZyk/preview#',
	},

	// Special content.
	{
		rx: /^\/((game(-?dev)?)-?(tutorials?|guides?|deep-?dives?))(?:\/.*)?$/i,
		to: 'https://devlog.levi.dev/2022/04/game-dev-guides-and-deep-dives.html',
	},
	{
		rx: /^\/(((2d-?)?(platform(er)?|(platform(er)?-?)?ai)-?(movement|series|path-?find(ing)?|tutorial)?)|path-?finding)(?:\/.*)?$/i,
		to: 'https://devlog.levi.dev/2021/09/building-platformer-ai-from-low-level.html',
	},
	{
		rx: /^\/((game(play)?)?-?show-?reel)(?:\/.*)?$/i,
		to: 'https://levi.dev#showreel',
	},
	{
		rx: /^\/(octobit(-?(20)?21)?|art|pixel-?art|pixels?)(?:\/.*)?$/i,
		to: 'https://levi.dev/#octobit-2021',
	},
	{
		rx: /^\/(octobit(-?2021)?-?twitter)(?:\/.*)?$/i,
		to: 'https://twitter.com/search?q=(%23Octobit%20OR%20%23Octobit2021)%20(from%3Alevisl)&src=typed_query',
	},
	{
		rx: /^\/(octobit(-?2021)?-?time-?lapses?)(?:\/.*)?$/i,
		to: 'https://www.youtube.com/playlist?list=PLIuJN99AFOPR6PIdddURuBwMQeWC4VeH5',
	},
	{
		rx: /^\/(octobit(-?2021)?-?video)(?:\/.*)?$/i,
		to: 'https://www.youtube.com/watch?v=eZ1hoM2edDM',
	},
	{
		rx: /^\/(music|performances?|acappella)(?:\/.*)?$/i,
		to: 'https://levi.dev/#music',
	},
	{
		rx: /^\/(songs?|sounds?|audio|chip-?tunes?|compositions?)(?:\/.*)?$/i,
		to: 'https://soundcloud.com/levilindsey/sets/chiptunes',
	},

	// Frameworks and games.
	{
		rx: /^\/((generator-?)?mean(ie)?)(?:\/.*)?$/i,
		to: 'https://npmjs.org/package/generator-meanie',
	},
	{
		rx: /^\/(surfacer?)(?:\/.*)?$/i,
		to: 'https://github.com/SnoringCatGames/surfacer',
	},
	{
		rx: /^\/(scaff?old(er)?)(?:\/.*)?$/i,
		to: 'https://github.com/SnoringCatGames/scaffolder',
	},
	{
		rx: /^\/((surface-?)?tile[rs]?)(?:\/.*)?$/i,
		to: 'https://github.com/SnoringCatGames/surface_tiler',
	},
	{
		rx: /^\/(squirrel|squirrels|squirrel-away|squirrel_away|exampler)(?:\/.*)?$/i,
		to: 'https://snoringcatgames.github.io/exampler',
	},
	{
		rx: /^\/(dandelions|dandelion|baby)(?:\/.*)?$/i,
		to: 'https://levilindsey.github.io/dandelions',
	},
	{
		rx: /^\/(momma-duck|momma_duck|mama-duck|mamma-duck|mama|momma|mamma|duck|duckling|ducks|ducklings)(?:\/.*)?$/i,
		to: 'https://snoringcatgames.github.io/momma_duck',
	},
	{
		rx: /^\/(meteor(-?power)?)(?:\/.*)?$/i,
		to: 'https://snoringcatgames.github.io/meteor_power/',
	},
	// Hop 'n Bop.
	{
		rx: /^\/(hop(-?n)?(-?bop)?|bunn(y|ies)|rabbits?)(?:\/.*)?$/i,
		to: 'https://hopnbop.net',
	},
	// Knots (github.com/levilindsey/knotmaze, deployed to its own Pages
	// project by its own GitHub Actions workflow). The app is served at
	// /knotmaze/ by functions/knotmaze/[[path]].js, which is more
	// specific than this catchall, so /knotmaze itself never reaches
	// this entry; the aliases (old shared /knots links, and /maze) land on
	// that canonical URL. The app keeps its whole state in the URL, so the
	// query string is forwarded.
	{
		rx: /^\/(knots?|knot-?maze|celtic-?knots?|mazes?)(?:\/.*)?$/i,
		to: '/knotmaze/',
		keepQuery: true,
	},

	// Game jams.
	{
		rx: /^\/(gmtk-?(20)?21)(?:\/.*)?$/i,
		to: 'https://levilindsey.github.io/gmtk-2021',
	},
	{
		rx: /^\/(gmtk-?(20)?24|sticky-?ships?|sticky|ships?)(?:\/.*)?$/i,
		to: 'https://voithos.itch.io/sticky-ships',
	},
	{
		rx: /^\/(ooboloo|(ggj|global-?game-?jam)-?((20)?21))(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/ooboloo',
	},
	{
		rx: /^\/((tale-?of-?)?two-?sides|(ggj|global-?game-?jam)-?((20)?22)?)(?:\/.*)?$/i,
		to: 'https://voithos.itch.io/tale-of-two-sides',
	},
	{
		rx: /^\/((up)?root(ed)?|(ggj|global-?game-?jam)-?((20)?23)?)(?:\/.*)?$/i,
		to: 'https://voithos.itch.io/uprooted',
	},
	{
		rx: /^\/(beans?|farts?|pull-?my-?finger((-?a)?-?bean-?based-?survival-?game)?|(ggj|global-?game-?jam)-?((20)?24)?)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/pull-my-finger-a-bean-based-survival-game',
	},
	{
		rx: /^\/(((((oh-?)?the-?)?places-?you(ll)?-?blow)|blow|(bubble(-?gum)?))|(ggj|global-?game-?jam)-?((20)?25)?)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/oh-the-places-youll-blow',
	},
	{
		rx: /^\/(masks?|imaginations?|(the-?)?masks?-?of-?imaginations?|(ggj|global-?game-?jam)-?((20)?26)?)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/mask-of-imaginations',
	},
	{
		rx: /^\/(ld47|ludum-?dare-?47|stuck-in-an-inner-tube|tube-climber)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/stuck-in-an-inner-tube',
	},
	{
		rx: /^\/(ld48|ludum-?dare-?48|before-times|the-before-times|beforetimes|thebeforetimes)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/the-before-times',
	},
	{
		rx: /^\/(ld49|ludum-?dare-?49|(the-?)?eye-?of-?glower-?on|mount-?oh-?no|eye)(?:\/.*)?$/i,
		to: 'https://snoringcatgames.github.io/eye_of_glower_on/',
	},
	{
		rx: /^\/(ld50|ludum-?dare-?50)(?:\/.*)?$/i,
		to: 'https://levilindsey.github.io/ludum-dare-50/',
	},
	{
		rx: /^\/(ld51|ludum-?dare-?51|village|village-?defender|defender)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/village-defender',
	},
	{
		rx: /^\/(ld52|ludum-?dare-?52|(what-?)?must-?be-?done)(?:\/.*)?$/i,
		to: 'https://drgvdg.itch.io/what-must-be-done',
	},
	{
		rx: /^\/(ld54|ludum-?dare-?54|orbital(-?melt-?down(-?death-?by-?lasers?-?beneath-?the-?naked-?sun)?)?)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/orbital-meltdown-death-by-laser-beneath-the-naked-sun',
	},
	{
		rx: /^\/(ld55|ludum-?dare-?55|dicey?(-?demons?)?|die)(?:\/.*)?$/i,
		to: 'https://drgvdg.itch.io/dicey-demons',
	},
	{
		rx: /^\/((ld|ludum-?dare-?)56|(business?-?be(e|a)tles?|business|be(e|a)tles?))(?:\/.*)?$/i,
		to: 'https://drgvdg.itch.io/business-beetles',
	},
	{
		rx: /^\/((ld|ludum-?dare-?)57|((typ(e|ing)-?(at-?)?depth)|(typ(e|ing))|depth|deep))(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/typing-at-depth',
	},
	{
		rx: /^\/((ld|ludum-?dare-?)58|if-?i-?ran-?the(-?alien)?-?zoo|zoo|alien-?(abduction)?|ufo)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/if-i-ran-the-alien-zoo',
	},
	{
		rx: /^\/((ld|ludum-?dare-?)59|((kitten|cat)-?|bat-?)i?corn)(?:\/.*)?$/i,
		to: 'https://levi.dev/kittenbaticorn',
	},
	// Loose Screw (the LD60 repair-shop game). The jam-name aliases
	// follow the house pattern; the screw aliases are the game's
	// title with the 'loose' optional, like the 'celtic' in /knots.
	{
		rx: /^\/(ld60|ludum-?dare-?60|(loose-?)?screws?)(?:\/.*)?$/i,
		to: 'https://levilindsey.itch.io/loose-screw',
	},
];

export async function onRequest(context) {
	const url = new URL(context.request.url);
	for (const r of REDIRECTS) {
		if (r.rx.test(url.pathname)) {
			// Resolved against the request so a root-relative `to` stays
			// on whichever host served it (levi.dev, www, pages.dev).
			const to = new URL(r.keepQuery ? r.to + url.search : r.to, url);
			return Response.redirect(to.href, 301);
		}
	}
	// No match: let Pages serve its default 404.html.
	return context.next();
}
