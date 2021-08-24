function graniteButton(jsonButton, jsonTheme) {
  /*---------------------------------------------
    Global Variables
    ---------------------------------------------*/
  const id = jsonButton.id;
  const o = jsonButton.options;
  const r = jsonButton.records;
  const t = jsonTheme;
  const mode = t.mode || "midnight";
  const cssId = "#" + id;
  const granite_div = document.getElementById(id);

  /*---------------------------------------------
    Set The mode
    ---------------------------------------------*/
  granite_div.setAttribute("mode", mode);

  /*---------------------------------------------
    Attributes
    ---------------------------------------------*/
  switch (t.mode) {
    case "standard":
      !!o.btn_color ? "" : (o.btn_color = "#eaeaea");
      !!o.text_color ? "" : (o.text_color = "#000000");
      !!o.border_color ? "" : (o.border_color = "#000000");
      !!o.btn_color_hover ? "" : (o.btn_color_hover = "#cccccc");
      !!o.text_color_hover ? "" : (o.text_color_hover = "#000000");
      !!o.border_color_hover ? "" : (o.border_color_hover = "#000000");
      break;
    default:
      !!o.btn_color ? "" : (o.btn_color = "#303030");
      !!o.text_color ? "" : (o.text_color = "#ffffff");
      !!o.border_color ? "" : (o.border_color = "#ffffff");
      !!o.btn_color_hover ? "" : (o.btn_color_hover = "#4c4c4c");
      !!o.text_color_hover ? "" : (o.text_color_hover = "#ffffff");
      !!o.border_color_hover ? "" : (o.border_color_hover = "#ffffff");
      break;
  }
  !!o.btn_target ? "" : (o.btn_target = "_self");
  !!o.text_size ? "" : (o.text_size = "16");
  !!o.border_radius ? "" : (o.border_radius = "0");
  !!o.border_width ? "" : (o.border_width = "0");
  !!o.border_width_hover ? "" : (o.border_width_hover = "0");
  !!o.btn_width ? "" : (o.btn_width = "auto");

  !!o.padding_top ? "" : (o.padding_top = "15");
  !!o.padding_right ? "" : (o.padding_right = "15");
  !!o.padding_bottom ? "" : (o.padding_bottom = "15");
  !!o.padding_left ? "" : (o.padding_left = "15");

  !!o.margin_top ? "" : (o.margin_top = "0");
  !!o.margin_right ? "" : (o.margin_right = "0");
  !!o.margin_bottom ? "" : (o.margin_bottom = "0");
  !!o.margin_left ? "" : (o.margin_left = "0");

  //action
  let btn_url = o.btn_url || "";
  let btn_target = o.btn_target;
  let btn_classes = o.btn_classes;
  let btn_id = o.btn_id;

  //text
  let btn_text = o.btn_text || "Click Here";
  let font_size = o.text_size + "px";
  let text_color = o.text_color;
  let font_style = o.font_style || "hero-new, sans-serif";
  let font_weight = o.font_weight || "300";

  //style
  let btn_color = o.btn_color;
  let border_width = o.border_width + "px";
  let border_color = o.border_color;
  let border_radius = o.border_radius + "4px";
  let paddingTop = o.padding_top + "px";
  let paddingRight = o.padding_right + "px";
  let paddingBottom = o.padding_bottom + "px";
  let paddingLeft = o.padding_left + "px";
  let marginTop = o.margin_top + "px";
  let marginRight = o.margin_right + "px";
  let marginBottom = o.margin_bottom + "px";
  let marginLeft = o.margin_left + "px";

  //hover
  let btn_color_hover = o.btn_color_hover;
  let text_color_hover = o.text_color_hover;
  let border_width_hover = o.border_width_hover + "px";
  let border_color_hover = o.border_color_hover;

  //Active
  let btn_color_active = o.btn_color_active;
  let text_color_active = o.text_color_active;
  let border_width_active = o.border_width_active + "px";
  let border_color_active = o.border_color_active;

  //layout
  let align_btn = o.align_btn || "flex-start";
  let btn_width = o.btn_width;

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
    CSS Block
    ---------------------------------------------*/
  var buttonCss = document.createElement("style");
  buttonCss.id = "g__css_" + id;
  buttonCss.innerHTML = `
    ${cssId} .g__elm_btn{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: ${font_style};
        text-decoration: none;
        font-weight: ${font_weight};
        font-size: ${font_size};
        color: ${text_color};
        width: ${btn_width};
        padding-top: ${paddingTop};
        padding-right: ${paddingRight};
        padding-bottom: ${paddingBottom};
        padding-left: ${paddingLeft};
        margin-top: ${marginTop};
        margin-right: ${marginRight};
        margin-bottom: ${marginBottom};
        margin-left: ${marginLeft};
        border-radius: ${border_radius};
        border: ${border_width} solid ${border_color};
        background: ${btn_color};
        transition: all .5s ease;
    }
    ${cssId} .g__elm_btn:hover{
        background: ${btn_color_hover};
        color: ${text_color_hover};
        border: ${border_width_hover} solid ${border_color_hover};
        cursor: pointer;
    }
    ${cssId} .g__elm_btn:active{
        background: ${btn_color_active};
        color: ${text_color_active};
        border: ${border_width_active} solid ${border_color_active};
        cursor: pointer;
    }
    ${cssId} .g__active_btn{
      text-decoration: none;
      background: ${btn_color_active};
      color: ${text_color_active};
      border: ${border_width_active} solid ${border_color_active};
      cursor: pointer;
    }
    `;
  let granite_css = document.getElementById("g__css_" + id);
  if (granite_css) {
    granite_css.remove();
  }
  document.head.appendChild(buttonCss);
  /*---------------------------------------------
    Wrapper
    ---------------------------------------------*/
  let button;
  if (!!btn_url) {
    button = document.createElement("a");
    !!o.btn_classes ? button.setAttribute("class", btn_classes) : "";
    button.classList.add("g__elm_btn");
    !!o.active ? button.classList.add("g__active_btn") : "";
    !!o.btn_id ? (button.id = btn_id) : "";
    o.btn_disabled ? (button.disabled = o.btn_disabled) : "";
    button.href = btn_url;
    button.target = btn_target;
    button.innerHTML = btn_text;
  } else {
    button = document.createElement("button");
    !!o.btn_classes ? button.setAttribute("class", btn_classes) : "";
    button.classList.add("g__elm_btn");
    !!o.active ? button.classList.add("g__active_btn") : "";
    !!o.btn_id ? (button.id = btn_id) : "";
    button.type = "button";
    button.target = btn_target;
    button.innerHTML = btn_text;
  }
  /*---------------------------------------------
    Append micro to the DOM
    ---------------------------------------------*/
  granite_div.appendChild(button);
}
