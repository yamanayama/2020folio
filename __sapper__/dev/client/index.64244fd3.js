import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as space, e as element, t as text, q as query_selector_all, b as detach_dev, c as claim_space, f as claim_element, g as children, h as claim_text, j as add_location, k as attr_dev, l as insert_dev, m as append_dev, n as noop } from './client.778a15c4.js';

/* src/routes/index.svelte generated by Svelte v3.20.1 */

const file = "src/routes/index.svelte";

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let figure;
	let img;
	let img_src_value;
	let t3;
	let figcaption;
	let t4;
	let t5;
	let p;
	let strong;
	let t6;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("Great success!");
			t2 = space();
			figure = element("figure");
			img = element("img");
			t3 = space();
			figcaption = element("figcaption");
			t4 = text("HIGH FIVE!");
			t5 = space();
			p = element("p");
			strong = element("strong");
			t6 = text("Try editing this file (src/routes/index.svelte) to test live reloading.");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-f3rs35\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Great success!");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			figure = claim_element(nodes, "FIGURE", {});
			var figure_nodes = children(figure);
			img = claim_element(figure_nodes, "IMG", { alt: true, src: true });
			t3 = claim_space(figure_nodes);
			figcaption = claim_element(figure_nodes, "FIGCAPTION", {});
			var figcaption_nodes = children(figcaption);
			t4 = claim_text(figcaption_nodes, "HIGH FIVE!");
			figcaption_nodes.forEach(detach_dev);
			figure_nodes.forEach(detach_dev);
			t5 = claim_space(nodes);
			p = claim_element(nodes, "P", {});
			var p_nodes = children(p);
			strong = claim_element(p_nodes, "STRONG", {});
			var strong_nodes = children(strong);
			t6 = claim_text(strong_nodes, "Try editing this file (src/routes/index.svelte) to test live reloading.");
			strong_nodes.forEach(detach_dev);
			p_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Hello Noel | murakami naomi's portfolio site";
			add_location(h1, file, 8, 0, 111);
			attr_dev(img, "alt", "Borat");
			if (img.src !== (img_src_value = "great-success.png")) attr_dev(img, "src", img_src_value);
			add_location(img, file, 11, 2, 147);
			add_location(figcaption, file, 12, 2, 193);
			add_location(figure, file, 10, 0, 136);
			add_location(strong, file, 16, 2, 246);
			add_location(p, file, 15, 0, 240);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, figure, anchor);
			append_dev(figure, img);
			append_dev(figure, t3);
			append_dev(figure, figcaption);
			append_dev(figcaption, t4);
			insert_dev(target, t5, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, strong);
			append_dev(strong, t6);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(figure);
			if (detaching) detach_dev(t5);
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Routes", $$slots, []);
	return [];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNjQyNDRmZDMuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
