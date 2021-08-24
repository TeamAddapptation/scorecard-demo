class GraniteBlock {
  attached = false;
  parentExtensions = [];
  extensions = [];
  constructor(
    feature,
    id,
    name,
    options,
    records,
    theme,
    layoutElement = false
  ) {
    this.feature = feature;
    this.id = id;
    this.name = name;
    this.options = options;
    if (!options) {
      this.options = graniteFunctions[feature].defaultOptions;
    }
    this.records = records;
    if (!records || records?.length === 0) {
      this.records = [];
    }
    this.theme = theme;
    if (graniteFunctions[feature])
      this.graniteFunc = graniteFunctions[feature].func;
    else this.graniteFunc = null;
    this.layoutElement = layoutElement;
  }

  internalAttach() {
    if (this.graniteFunc) {
      if (!this.layoutElement) {
        document.getElementById(this.id).innerHTML = "";
      }
      let ce = this.extensions.concat(this.parentExtensions);
      this.graniteFunc(
        {
          id: this.id,
          options: this.options,
          records: this.records,
        },
        this.theme
      );
      this.attached = true;
    }
  }

  attach(parent) {
    if (this.graniteFunc) {
      let o = parent.querySelector(`#${this.id}`);
      if (!o) {
        throw Error(`DOM with id ${this.id} is not within Granite parent DOM.`);
      }
      try {
        if (!this.layoutElement) {
          o.innerHTML = "";
        }
        let ce = this.extensions.concat(this.parentExtensions);
        this.graniteFunc(
          {
            id: this.id,
            options: this.options,
            records: this.records,
          },
          this.theme
        );
        this.attached = true;
      } catch (e) {
        console.debug(e);
      }
    }
  }

  addExtension(func) {
    this.extensions.push(func);
    this.internalAttach();
  }

  addExtensions(exts) {
    this.extensions.concat(exts);
    this.internalAttach();
  }

  //Options Methods
  setOption(key, value) {
    this.options[key] = value;
    this.internalAttach();
  }

  getOption(key) {
    return this.options[key];
  }

  //Records Methods
  addRecord(record) {
    this.records.push(record);
    this.internalAttach();
  }

  setRecord(index, record) {
    this.records[index] = record;
    this.internalAttach();
  }

  setRecordById(id, record) {
    this.records = this.parseRecordChildren(id, this.records, record);
    this.internalAttach();
  }

  parseRecordChildren(id, children, record) {
    let r = [];
    children.forEach((re) => {
      let n = re;
      if (n.addapptation_id === id) {
        r.push(record);
      } else {
        if (n.children?.length > 0) {
          n.children = this.parseRecordChildren(id, n.children, record);
        }
        r.push(n);
      }
    });
    return r;
  }

  getRecord(index) {
    return this.records[index];
  }

  getRecordById(id) {
    return this.getRecordChildById(id, this.records);
  }

  getRecordChildById(id, children) {
    let r = null;
    children.forEach((re) => {
      if (re.addapptation_id === id) {
        r = re;
      } else {
        if (re.children?.length > 0) {
          let n = this.getRecordChildById(id, re.children);
          if (n !== null) {
            r = n;
          }
        }
      }
    });
    return r;
  }

  getRecords() {
    return this.records;
  }

  setRecords(rArray) {
    this.records = rArray;
    this.internalAttach();
  }

  insertRecord(index, record) {
    this.records.splice(index, 0, record);
    this.internalAttach();
  }

  //Editor specific methods
  generateFormFields(defaultFormFields) {
    function parseFormFields(children, element) {
      let r = [];
      children.forEach((field) => {
        let cField = field;
        if (field["type"] !== "section") {
          cField["value"] = element[field.name];
        }
        if (field.children) {
          cField.children = parseFormFields(field.children, element);
        }
        r.push(cField);
      });
      return r;
    }
    let options = this.options;
    let ff = parseFormFields(defaultFormFields, options);
    return ff;
  }
}
