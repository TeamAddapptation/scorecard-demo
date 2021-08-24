function graniteProgressBar(jsonBlock, jsonTheme) {
  const id = jsonBlock.id;
  const o = jsonBlock.options;
  const r = jsonBlock.records;
  const t = jsonTheme;
  const mode = t.mode || "midight";
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
  Attributes
  ---------------------------------------------*/
  switch (t.mode) {
    case "standard":
      !!o.text_color ? "" : (o.text_color = "#000000");
      break;
    default:
      !!o.text_color ? "" : (o.text_color = "#ffffff");
      break;
  }
  let gradient;
  if (o.linear_gradient) {
    gradient = `linear-gradient(0.25turn, ${o.gradient});`;
  } else {
    gradient = o.background_color || "red";
  }

  let font_style = "hero-new, sans-serif";

  !!o.padding_top ? "" : (o.padding_top = "0");
  !!o.padding_right ? "" : (o.padding_right = "0");
  !!o.padding_bottom ? "" : (o.padding_bottom = "0");
  !!o.padding_left ? "" : (o.padding_left = "0");

  !!o.margin_top ? "" : (o.margin_top = "0");
  !!o.margin_right ? "" : (o.margin_right = "0");
  !!o.margin_bottom ? "" : (o.margin_bottom = "0");
  !!o.margin_left ? "" : (o.margin_left = "0");

  let paddingTop = o.padding_top + "px";
  let paddingRight = o.padding_right + "px";
  let paddingBottom = o.padding_bottom + "px";
  let paddingLeft = o.padding_left + "px";
  let marginTop = o.margin_top + "px";
  let marginRight = o.margin_right + "px";
  let marginBottom = o.margin_bottom + "px";
  let marginLeft = o.margin_left + "px";
  /*---------------------------------------------
    CSS Block
    ---------------------------------------------*/
  var codeCss = document.createElement("style");
  codeCss.id = "g__css_" + id;
  codeCss.innerHTML = `
      ${cssId}{
        font-family: ${font_style};
        font-weight: 300;
        color: #5d5d5d;
        text-align: left;
        flex: 1;
        padding-top: ${paddingTop};
        padding-right: ${paddingRight};
        padding-bottom: ${paddingBottom};
        padding-left: ${paddingLeft};
        margin-top: ${marginTop};
        margin-right: ${marginRight};
        margin-bottom: ${marginBottom};
        margin-left: ${marginLeft};
      }
      ${cssId} .g__progress-label {
        font-family: ${font_style};
        font-weight: 300;
        color: #202020;
        font-size: 21px;
        margin-bottom: 15px;
      }
      ${cssId} .g__progress_container{
        display: flex;
        align-items: center;
      }
      ${cssId} .g__progress-percent{
        margin: 0 15px;
        font-size: 16px;
        font-weight: 500;
      }
      ${cssId} .g__progress-details{
        font-size: 12px;
        font-weight: 400;
      }
      ${cssId} progress {
        border-radius: 7px;
        height: 20px;
        width: 85%;
        box-shadow: 1px 1px 4px rgba( 0, 0, 0, 0.2 );
      }
      ${cssId} progress::-webkit-progress-bar {
        background-color: #f2f2f2;
        border-radius: 7px;
      }
      ${cssId} progress::-webkit-progress-value {
        background: ${gradient};
        border-radius: 7px;
      }
      `;
  let granite_css = document.getElementById("g__css_" + id);
  if (granite_css) {
    granite_css.remove();
  }
  document.head.appendChild(codeCss);
  /*---------------------------------------------
    Main Build
    ---------------------------------------------*/

  const progressCont = document.createElement("div");
  progressCont.classList.add("g__progress_container");
  progressCont.classList.add("animate__animated");
  progressCont.classList.add("animate__fadeIn");

  if (o.label) {
    const progressLabel = document.createElement("h2");
    progressLabel.classList.add("g__progress-label");
    progressLabel.innerHTML = o.label;
    granite_div.appendChild(progressLabel);
  }

  const progress = document.createElement("progress");
  progress.value = ((o.value / o.goal) * 100).toFixed(2);
  progress.max = !!o.max ? o.max : "100";
  progress.min = !!o.min ? o.min : "100";
  progressCont.appendChild(progress);

  const percent = document.createElement("div");
  percent.classList.add("g__progress-percent");
  percent.innerHTML = ((o.value / o.goal) * 100).toFixed(2) + "%";
  progressCont.appendChild(percent);

  const details = document.createElement("div");
  details.classList.add("g__progress-details");
  details.innerHTML = o.value + "M / " + o.goal + "M";
  progressCont.appendChild(details);

  granite_div.appendChild(progressCont);
}
