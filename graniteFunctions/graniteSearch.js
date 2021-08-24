function graniteSearch(jsonBlock, jsonTheme) {
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
  !!o.table_id ? "" : (o.table_id = false);

  !!o.padding_top ? "" : (o.padding_top = "5");
  !!o.padding_right ? "" : (o.padding_right = "5");
  !!o.padding_bottom ? "" : (o.padding_bottom = "5");
  !!o.padding_left ? "" : (o.padding_left = "5");

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
  ${cssId}{
    display: flex;
    justify-content: flex-start;
  }
  ${cssId} .g__search_container{
    position: relative;
  }
  ${cssId} .g__elm_search{
    width: 100%;
    min-width: 15ch;
    max-width: 30ch;
    border: 1px solid #eaeaea;
    border-radius: 0.25em;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1.1;
    color: #5D5D5D;
    background-color: #fbfbfb;
    padding-top: ${paddingTop};
    padding-right: ${paddingRight};
    padding-bottom: ${paddingBottom};
    padding-left: ${paddingLeft};
    margin-top: ${marginTop};
    margin-right: ${marginRight};
    margin-bottom: ${marginBottom};
    margin-left: ${marginLeft};
  }
  ${cssId} .g__search_icon{
    position: absolute;
    top: 8px;
    left: 8px;
    color: #5d5d5d;
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
  const searchCont = document.createElement("div");
  searchCont.classList.add("g__search_container");

  let search = document.createElement("input");
  search.type = "text";
  search.classList.add("g__elm_search");
  !!o.search_id ? (search.id = o.search_id) : "";
  !!o.search_id ? (search.name = o.search_id) : "";
  !!o.search_classes ? search.classList.add(o.search_classes) : "";
  searchCont.appendChild(search);

  const searchIcon = document.createElement("div");
  searchIcon.classList.add("g__search_icon");
  searchIcon.innerHTML = `<i class="fal fa-search"></i>`;
  searchCont.appendChild(searchIcon);

  if (o.table_id) {
    search.addEventListener("input", () => {
      let filter = search.value.toUpperCase();
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
  granite_div.appendChild(searchCont);
}
