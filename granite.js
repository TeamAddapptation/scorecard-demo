class Granite {
  graniteId = null;
  graniteDom = null;
  graniteLayout = null;
  graniteTheme = {
    primary: null,
    secondary: null,
    mode: "midnight",
  };
  graniteObjects = {};
  extensions = {
    all: [],
  };

  constructor(params) {
    if (!params.hasOwnProperty("id")) throw new Error(`DOM id requried.`);
    this.graniteId = params.id;
    if (params.hasOwnProperty("layout")) {
      console.debug("Layout provided");
      this.graniteLayout = params.layout;
    } else {
      console.debug("No layout provided");
    }
    if (params.hasOwnProperty("theme")) {
      this.graniteTheme = params.theme;
    } else {
      console.debug("No theme provided");
    }
    if (params.hasOwnProperty("blocks")) {
      let blocks = params.blocks;
      blocks.forEach((block) => {
        this.create(block);
      });
    } else {
      console.debug("No micros provided");
    }
  }

  //Internal Functions
  parseLayout(layout) {
    let r = [];
    layout.forEach((block) => {
      let n = document.createElement("div");
      n.id = block.Id;
      if (block.children) {
        let cList = this.parseLayout(block.children);
        cList.forEach((child) => {
          n.appendChild(child);
        });
      }
      r.push(n);
    });
    return r;
  }

  setLayout(layout) {
    if (layout) {
      let cl = this.parseLayout(this.graniteLayout);
      cl.forEach((el) => {
        this.graniteDom.appendChild(el);
      });
    }
  }

  //Granite Blocks specific functions
  select(id) {
    if (this.graniteObjects[id]) return this.graniteObjects[id];
    return null;
  }

  create(block) {
    if (!block.hasOwnProperty("feature"))
      throw new Error(`Micro does specify a feature.`);
    if (!block.hasOwnProperty("id"))
      throw new Error(`Micro does specify an id.`);
    let blockId = block.id;
    let blockName = block.name;
    let blockOptions = block.options;
    let blockRecords = block.records;
    let feature = block.feature;
    let layoutElement = block.layoutElement ? block.layoutElement : false;
    this.graniteObjects[blockId] = new GraniteBlock(
      feature,
      blockId,
      blockName,
      blockOptions,
      blockRecords,
      this.graniteTheme,
      layoutElement
    ).internalAttach();
  }

  addExtension(feature, func) {
    if (feature === "all") {
      this.extensions["all"].push(func);
    } else {
      for (const id in this.graniteObjects) {
        let block = this.graniteObjects[id];
        if (block.feature === feature) block.addExtension(func);
      }
      if (typeof this.extensions[feature] === "undefined")
        this.extensions[feature] = [];
      this.extensions[feature].push(func);
    }
  }

  attach() {
    let id = this.graniteId;
    let graniteDom = document.getElementById(id);
    if (!graniteDom) throw new Error(`Element with id ${id} does not exist.`);
    this.graniteDom = graniteDom;
    this.setLayout(this.graniteLayout);
    Object.entries(this.graniteObjects).forEach((block) => {
      let feature = block[1].feature;
      let extensions = this.extensions[feature];
      if (typeof extensions === "undefined") extensions = [];
      extensions = extensions?.concat(this.extensions["all"]);
      if (typeof extensions !== "undefined") {
        extensions.forEach((extension) => {
          if (
            !this.graniteObjects[block[1].id].parentExtensions.includes(
              extension
            )
          ) {
            this.graniteObjects[block[1].id].parentExtensions.push(extension);
          }
        });
      }
      try {
        block[1].attach(this.graniteDom);
      } catch (error) {
        console.debug(error);
      }
    });
    return this;
  }
}
