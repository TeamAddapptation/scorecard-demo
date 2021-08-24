function graniteFilter(jsonBlock, jsonTheme) {
  /*---------------------------------------------
    Global Variables
    ---------------------------------------------*/
  const id = jsonBlock.id;
  const o = jsonBlock.options;
  const r = jsonBlock.records;
  const t = jsonTheme;
  const mode = t.mode || "midnight";
  const cssId = "#" + id;
  const granite_div = document.getElementById(id);

  granite_div.innerHTML = "";

  /*---------------------------------------------
    Add Font Family To Header
    ---------------------------------------------*/
  const font_include = document.getElementById("g__font_stylesheet");
  if (!font_include) {
    var head = document.head;
    var fontLink = document.createElement("link");
    fontLink.type = "text/css";
    fontLink.rel = "stylesheet";
    fontLink.id = "g__font_stylesheet";
    fontLink.href = "https://use.typekit.net/ihq4dbs.css";
    head.appendChild(fontLink);
  }

  /*---------------------------------------------
    Set The mode
    ---------------------------------------------*/
  granite_div.setAttribute("mode", mode);

  /*---------------------------------------------
    Attributes
  ---------------------------------------------*/
  let font_style = "hero-new, sans-serif";

  !!o.padding_top ? "" : (o.padding_top = "0");
  !!o.padding_right ? "" : (o.padding_right = "0");
  !!o.padding_bottom ? "" : (o.padding_bottom = "0");
  !!o.padding_left ? "" : (o.padding_left = "0");

  !!o.margin_top ? "" : (o.margin_top = "0");
  !!o.margin_right ? "" : (o.margin_right = "0");
  !!o.margin_bottom ? "" : (o.margin_bottom = "0");
  !!o.margin_left ? "" : (o.margin_left = "0");

  let fontColorMode = mode === "midnight" ? "#bfbfbf" : "#a1a1a1";
  const img_url = o.img_url || "";

  //layout
  let paddingTop = o.padding_top + "px";
  let paddingRight = o.padding_right + "px";
  let paddingBottom = o.padding_bottom + "px";
  let paddingLeft = o.padding_left + "px";
  let marginTop = o.margin_top + "px";
  let marginRight = o.margin_right + "px";
  let marginBottom = o.margin_bottom + "px";
  let marginLeft = o.margin_left + "px";
  let justify_content = o.justify_content || "center";

  /*---------------------------------------------
    CSS Block
    ---------------------------------------------*/
  var imgCss = document.createElement("style");
  imgCss.id = "g__css_" + id;
  imgCss.innerHTML = `
  ${cssId} .g__filter_container{
    display: flex;
    justify-content: flex-start;
    height: 40px;
    font-family: ${font_style};
    font-weight: 300;
    padding-top: ${paddingTop};
    padding-right: ${paddingRight};
    padding-bottom: ${paddingBottom};
    padding-left: ${paddingLeft};
    margin-top: ${marginTop};
    margin-right: ${marginRight};
    margin-bottom: ${marginBottom};
    margin-left: ${marginLeft};
    border: 1px solid #eaeaea;
    border-radius: 0.25em;
    background: #FBFBFB;
  }
  ${cssId} .g__filter-label{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1.2rem;
    color: #5d5d5d;
    padding: 0 10px;
    border-right: 1px solid #eaeaea;
    cursor: pointer;
    background-color: #fff;
  }
  ${cssId} select{
    width: 100%;
    min-width: 150px;;
    font-size: 1.5rem;
    border: 0;
    color: #5d5d5d;
    cursor: pointer;
    padding: 0 10px;
    line-height: 1.1;
    background: #FBFBFB;
  }
    `;
  let granite_css = document.getElementById("g__css_" + id);
  if (granite_css) {
    granite_css.remove();
  }
  document.head.appendChild(imgCss);

  /*---------------------------------------------
    Wrapper
  ---------------------------------------------*/
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("g__filter_container");

  if (o.label) {
    const filterLabel = document.createElement("label");
    filterLabel.classList.add("g__filter-label");
    filterLabel.innerHTML = "Filter Name: ";
    filterContainer.appendChild(filterLabel);
  }

  let filter = document.createElement("select");
  filter.classList.add("g__elm_select");
  !!o.select_id ? (filter.id = o.select_id) : "";
  !!o.select_id ? (filter.name = o.select_id) : "";
  !!o.select_classes ? filter.classList.add(o.select_classes) : "";
  filterContainer.appendChild(filter);
  if (o.placeholder) {
    const placeholder = document.createElement("option");
    placeholder.selected = true;
    placeholder.disabled = true;
    placeholder.innerHTML = o.placeholder;
    filter.appendChild(placeholder);
  }
  if (o.select_options) {
    o.select_options.forEach((opt) => {
      const option = document.createElement("option");
      let formatValue = opt.replace(/ /g, "_").toLowerCase();
      option.setAttribute("value", formatValue);
      option.innerHTML = opt;
      filter.appendChild(option);
    });
  }
  if (o.table_id) {
    filter.addEventListener("change", () => {
      let filter = filter.value.toUpperCase();
      console.log(filter);
      let table = document.getElementById(o.table_id);
      let tr = table.getElementsByTagName("tr");
      for (let i = 0; i < tr.length; i++) {
        if (!tr[i].classList.contains("g__header")) {
          let td = tr[i].getElementsByTagName("td");
          for (let j = 0; j < td.length; j++) {
            if (td[j]) {
              let txtValue = td[j].textContent || td[j].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
              } else {
                tr[i].style.display = "none";
              }
            }
          }
        }
      }
    });
  }

  /*---------------------------------------------
    Append micro to the DOM
  ---------------------------------------------*/
  granite_div.appendChild(filterContainer);
}
