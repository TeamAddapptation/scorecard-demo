function graniteHeader(jsonHeader, jsonTheme) {
  /*---------------------------------------------
  Global Variables
  ---------------------------------------------*/
  const id = jsonHeader.id;
  const o = jsonHeader.options;
  const r = jsonHeader.records;
  const t = jsonTheme;
  const mode = t.mode || "midight";
  const cssId = "#" + id;
  const granite_div = document.getElementById(id);

  granite_div.innerHTML = "";
  /*---------------------------------------------
  Convert Hex to RGB
  ---------------------------------------------*/
  function hexToRgb(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
    }
    return `${hex} is not a valid Hex code.`;
  }
  /*---------------------------------------------
  Set The mode
  ---------------------------------------------*/
  granite_div.setAttribute("mode", mode);
  /*---------------------------------------------
  Attributes
  ---------------------------------------------*/
  //mode
  let font_color = mode === "midnight" ? "#ffffff" : "#101010";
  //text
  let header_size = o.header_size || "h1";
  let font_size;
  switch (header_size) {
    case "h1":
      font_size = !!o.font_size ? o.font_size : "38";
      break;
    case "h2":
      font_size = !!o.font_size ? o.font_size : "32";
      break;
    case "h3":
      font_size = !!o.font_size ? o.font_size : "28";
      break;
    case "h4":
      font_size = !!o.font_size ? o.font_size : "26";
      break;
    case "h5":
      font_size = !!o.font_size ? o.font_size : "20";
      break;
    case "h6":
      font_size = !!o.font_size ? o.font_size : "10";
      break;
  }
  switch (t.mode) {
    case "standard":
      !!o.text_color ? "" : (o.text_color = "#000000");
      break;
    default:
      !!o.text_color ? "" : (o.text_color = "#ffffff");
      break;
  }
  !!o.background_color ? "" : (o.background_color = "#ffffff");
  !!o.background_opacity ? "" : (o.background_opacity = "0");
  !!o.border_color ? "" : (o.border_color = "#ffffff");
  !!o.border_width ? "" : (o.border_width = "0");
  !!o.border_radius ? "" : (o.border_radius = "5");

  !!o.padding_top ? "" : (o.padding_top = "0");
  !!o.padding_right ? "" : (o.padding_right = "0");
  !!o.padding_bottom ? "" : (o.padding_bottom = "0");
  !!o.padding_left ? "" : (o.padding_left = "0");

  !!o.margin_top ? "" : (o.margin_top = "0");
  !!o.margin_right ? "" : (o.margin_right = "0");
  !!o.margin_bottom ? "" : (o.margin_bottom = "0");
  !!o.margin_left ? "" : (o.margin_left = "0");

  let header_text = o.header_text || "Heading";

  let text_color = o.text_color;
  let font_style = "hero-new, sans-serif";
  let font_weight = String(o.font_weight) === "true" ? "bold" : "300";
  let italic = o.italic ? "italic" : "normal";
  //style
  let background_color = hexToRgb(o.background_color);
  let background_opacity = parseInt(o.background_opacity) / 100;
  let border_width = o.border_width + "px";
  let border_color = o.border_color;
  let border_radius = o.border_radius + "px";
  let paddingTop = o.padding_top + "px";
  let paddingRight = o.padding_right + "px";
  let paddingBottom = o.padding_bottom + "px";
  let paddingLeft = o.padding_left + "px";
  let marginTop = o.margin_top + "px";
  let marginRight = o.margin_right + "px";
  let marginBottom = o.margin_bottom + "px";
  let marginLeft = o.margin_left + "px";
  //layout
  let alignContent = o.align_content || "flex-start";
  let alignText = o.align_text || "left";
  let horizontal_align = o.horizontal_align || "flex-start";
  let header_width = o.header_width || "auto";
  // Font
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
  var headerCss = document.createElement("style");
  headerCss.id = "g__css_" + id;
  headerCss.innerHTML = `
    ${cssId}{
        display: flex;
        flex-wrap: wrap;
        justify-content: ${alignContent};
    }
    ${cssId} .g__elm_header{
        font-family: ${font_style};
        font-weight: ${font_weight};
        font-style: ${italic};
        color: ${text_color};
        font-size: ${font_size + "px"};
        text-align: ${alignText};
        width: ${header_width};
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
        background: rgba(${background_color}, ${background_opacity});
    }
    `;
  let granite_css = document.getElementById("g__css_" + id);
  if (granite_css) {
    granite_css.remove();
  }
  document.head.appendChild(headerCss);
  /*---------------------------------------------
    Wrapper and Element
    ---------------------------------------------*/
  const header = document.createElement(header_size);
  !!o.id ? (header.id = o.id) : "";
  header.setAttribute("class", "g__elm_header");
  !!o.classes ? header.classList.add(o.classes) : "";
  header.setAttribute("data-micro-id", id);
  !!r.addapptation_id
    ? header.setAttribute("data-record-id", r.addapptation_id)
    : "";
  header.innerHTML = header_text;
  /*---------------------------------------------
    Append micro to the DOM
    ---------------------------------------------*/
  granite_div.appendChild(header);
}
