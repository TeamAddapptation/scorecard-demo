function graniteScorecard(jsonScorecard, jsonTheme) {
  /*---------------------------------------------
    Global Variables
    ---------------------------------------------*/
  const id = jsonScorecard.id;
  const o = jsonScorecard.options;
  const r = jsonScorecard.records;
  const t = jsonTheme;
  const mode = !!t.mode ? t.mode : "midnight";
  const cssId = "#" + id;
  const graniteDiv = document.getElementById(id);

  graniteDiv.innerHTML = "";
  /*---------------------------------------------
    CSS Attributes
    ---------------------------------------------*/
  let font_style = "hero-new, sans-serif";
  /*---------------------------------------------
    CSS Block
    ---------------------------------------------*/
  var scorecardCss = document.createElement("style");
  scorecardCss.id = "g__css_" + id;
  scorecardCss.innerHTML = `
  ${cssId}{
    font-family: ${font_style};
    font-weight: 300;
    width: 100%;
  }
  ${cssId} .g__filters-container{
    background: transparent;
    margin: 0 auto;
    font-family: arial, sans-serif;
  }
    ${cssId} #g__${id}{
      width: 100%;
      margin: 0 auto;
      color: #5D5D5D;
      font-family: arial, sans-serif;
      border-collapse: collapse;
      border: 1px solid #EAEAEA;
    }
    ${cssId} td,
    ${cssId} tbody {
      text-align: left;
      padding: 8px;
      padding: 15px;
      font-size: 14px;
    }
    ${cssId} tr.g__header_spacer {
      border: 0px solid #EAEAEA;
    }
    ${cssId} tr.g__header-spacer td {
      border: 0px solid #EAEAEA;
    }
    ${cssId} tr.g__header {
      font-weight: bold;
      border: 1px solid #EAEAEA;
      background: #F5F5F5;
    }
    ${cssId} tr.g__header i{
      float: right;
      transition: all .5s ease;
    }
    ${cssId} tr.g__total {
      font-weight: bold;
      border: 1px solid #EAEAEA;
      background: #E3E9FF;
    }
    ${cssId} tr.g__row{
      border: 0px solid #EAEAEA;
    }
    ${cssId} tr.g__row:nth-child(odd) {
      background-color: #fff;
    }
    ${cssId} tr.g__row:nth-child(even) {
      background-color: #FBFBFB;
    }
    ${cssId} th{
      padding: 10px;
      text-align: left;
      text-transform: uppercase;
      font-size: 14px;
    }
    ${cssId} thead tr{
      background: transparent;
      font-size: 1rem;
    }
    ${cssId} .g__header.g__close_arrow td i {
      transform: rotate(180deg);
    }
    ${cssId} .g__hide-group {
      display: none;
    }

    /*-------------------------------------
    Column Filters
    -------------------------------------*/
    ${cssId} .g__filters-container{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    ${cssId} .g__filter{
      position: relative;
      font-size: 1rem;
      float: right;
      transition: all 0.5s ease;
    }
    ${cssId} .g__filter:hover{
      cursor: pointer;
    }
    ${cssId} #g__column-filter{
      position: absolute;
      box-sixing: border-box;
      display: none;
      top: 20px;
      right: 0;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
    }
    ${cssId} #g__column-filter.g__show-filter{
      display: flex;
      flex-direction: column;
    }
    /*-------------------------------------
    Conditional Search Form
    -------------------------------------*/
    ${cssId} #search_sample-micro{
      padding: 10px;
    }
    ${cssId} .g__filter-1,
    ${cssId} .g__filter-2{
      display: flex;
      flex-direction: column;
      padding: 10px 0;
    }
    ${cssId} #g__column-filter select{
      flex: 1;
      min-width: 150px;;
      font-size: 1.5rem;
      border: 1px solid #EAEAEA;
      color: #5d5d5d;
      margin: 5px;
      cursor: pointer;
      padding: 0 10px;
      line-height: 1.1;
      background-color: #fff;
    }
    ${cssId} #g__column-filter input#g__column-input-1,
    ${cssId} #g__column-filter input#g__column-input-2{
      flex: 1;
      min-width: 150px;;
      font-size: 1.5rem;
      border: 1px solid #EAEAEA;
      color: #5d5d5d;
      margin: 5px;
      padding: 0 10px;
      line-height: 1.1;
      background-color: #fff;
    }
    /*-------------------------------------
    Action Alerts
    -------------------------------------*/
    ${cssId} .g__action-alert{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:15px;
      background: #ffeded;
      border: 1px solid #d13f3f;
      border-radius: 4px;
      color: #d13f3f;
      font-size: 1.3rem;
      margin: 0 0 15px 0;
    }
    ${cssId} .g__action-alert i{
      font-size: 2rem;
      color: #d13f3f;
      transition: all 0.5s ease;
    }
    ${cssId} .g__action-alert i:hover{
      cursor: pointer;
      transform: scale(1.1);
    }


      `;
  let granite_css = document.getElementById("g__css_" + id);
  if (granite_css) {
    granite_css.remove();
  }
  document.head.appendChild(scorecardCss);
  /*---------------------------------------------
    Main Build
    ---------------------------------------------*/
  let rowCount;
  // Row Count
  for (let i = 0; i < r.length; i++) {
    if (r[i].type === "row") {
      rowCount = r[i].children.length;
      break;
    }
  }
  // Filters Container
  let filters = document.createElement("div");
  filters.classList.add("g__filters-container");
  graniteDiv.appendChild(filters);

  // Main table container
  let table = document.createElement("table");
  table.classList.add("animate__animated");
  table.classList.add("animate__fadeIn");
  table.id = "g__" + id;
  graniteDiv.appendChild(table);

  // Table body
  const tbody = document.createElement("tbody");
  let rowArr = [];
  // Record loop and build
  r.forEach((r, index) => {
    let type = r.type;

    switch (type) {
      case "header":
        const thead = document.createElement("thead");
        r.background ? (thead.style.background = r.background) : "";
        let headerRow = document.createElement("tr");
        r.top_space ? headerRow.classList.add("g__top-space") : "";
        r.children.forEach((cell, index) => {
          const th = document.createElement("th");
          !!cell.value ? th.setAttribute("data-org-value", cell.value) : "";
          !!cell.align_text ? (th.style.textAlign = cell.align_text) : "";
          !!cell.border_right ? (th.style.borderRight = cell.border_right) : "";
          th.setAttribute("data-col-num", index);
          th.innerHTML = cell.value;
          cell.filter ? th.appendChild(columnFilter(cell, index)) : "";
          cell.span ? th.setAttribute("colspan", cell.span) : "";
          headerRow.appendChild(th);
        });
        r.sort
          ? th.addEventListener("click", () => {
              columnSort(e);
            })
          : "";
        thead.appendChild(headerRow);
        table.appendChild(thead);
        break;
      case "section":
        let fullRow = document.createElement("tr");
        fullRow.classList.add("g__header");
        r.top_space ? fullRow.classList.add("g__top-space") : "";
        const td = document.createElement("td");
        td.setAttribute("colspan", rowCount);
        r.background ? (td.style.backgroundColor = r.background) : "";
        !!r.value
          ? (td.innerHTML = r.value + '<i class="fas fa-chevron-down"></i>')
          : (td.innerHTML = r.value + '<i class="fas fa-chevron-down"></i>');
        fullRow.appendChild(td);
        tbody.appendChild(fullRow);
        table.appendChild(tbody);
        break;
      case "row":
        rowArr.push(index);
        let tr = document.createElement("tr");
        tr.classList.add("g__row");
        r.background ? (tr.style.background = r.background) : "";
        r.top_space ? tr.classList.add("g__top-space") : "";
        r.children.forEach((cell) => {
          const td = document.createElement("td");
          cell.background ? (td.style.backgroundColor = cell.background) : "";
          !!cell.format ? td.setAttribute("data-format", cell.format) : "";
          !!cell.currency ? td.setAttribute("data-curreny", cell.currency) : "";
          !!cell.border_right ? (td.style.borderRight = cell.border_right) : "";
          cell.span ? td.setAttribute("colspan", cell.span) : "";
          td.setAttribute("data-org-value", cell.value);
          cell.format
            ? (td.innerHTML = formatValue(
                cell.value,
                cell.format,
                cell.currency,
                cell.symbol
              ))
            : (td.innerHTML = cell.value);
          if (cell.action === "value") {
            let alert = setActionValue(cell);
            alert ? (td.style.backgroundColor = "#ffeded") : "";
          }
          if (cell.editable) {
            td.addEventListener("click", (e) => {
              e.target.contentEditable = true;
            });
          }
          tr.appendChild(td);
          tbody.appendChild(tr);
          table.appendChild(tbody);
        });
        break;
      case "total":
        let totalRow = document.createElement("tr");
        totalRow.classList.add("g__total");
        r.children.forEach((cell, index) => {
          const td = document.createElement("td");
          cell.background ? (td.style.backgroundColor = cell.background) : "";
          if (cell.total) {
            let total = 0;
            rowArr.forEach((row) => {
              let cellVal = table.rows[row].cells[index].innerHTML;
              if (Number(cellVal)) {
                total += parseInt(cellVal);
              }
            });
            cell.value = total;
            const pos = index;
            const rows = table.rows;
            Array.from(rows).forEach((item, cellIndex) => {});
          }
          if (cell.value) {
            cell.format
              ? (td.innerHTML = formatValue(cell))
              : (td.innerHTML = cell.value);
          }
          if (cell.action === "value") {
            setActionValue(cell);
          }
          totalRow.appendChild(td);
          tbody.appendChild(totalRow);
          table.appendChild(tbody);
        });
        break;
    }
  });
  graniteDiv.appendChild(table);
  /*---------------------------------------------
    Collapable Sections
    ---------------------------------------------*/
  let rowGroups = document.querySelectorAll(".g__header");
  if (rowGroups) {
    rowGroups.forEach((header) => {
      header.addEventListener("click", () => {
        let nextRow = header.nextElementSibling;
        header.classList.toggle("g__close_arrow");
        while (nextRow) {
          if (nextRow.classList.contains("g__header")) break;
          nextRow.classList.toggle("g__hide-group");
          nextRow = nextRow.nextElementSibling;
        }
      });
    });
  }
  /*---------------------------------------------
    Actions
    ---------------------------------------------*/
  function setActionValue(cell) {
    switch (cell.action_condition) {
      case "Greater Than":
        if (Number(cell.value) > Number(cell.action_value)) {
          switch (cell.action_execute) {
            case "Alert":
              actionAlert(cell);
              return true;
              break;
          }
        }
        break;
    }
  }
  /*---- Action Alert ------*/
  function actionAlert(cell) {
    const alertCont = document.createElement("div");
    alertCont.classList.add("g__action-alert");
    const alertMsg = document.createElement("p");
    alertMsg.innerHTML = cell.action_message;
    const alertClose = document.createElement("i");
    alertClose.setAttribute("class", "fal fa-times");
    alertClose.addEventListener("click", () => {
      alertCont.style.display = "none";
    });
    alertCont.appendChild(alertMsg);
    alertCont.appendChild(alertClose);
    table.before(alertCont);
  }
  /*---------------------------------------------
    Header Top Spacing
    ---------------------------------------------*/
  let rows = table.rows;
  Array.from(rows).forEach((row, index) => {
    let headerRow = row.classList.contains("g__header");
    let innerRow = row.classList.contains("g__row");
    let topSpace = row.classList.contains("g__top-space");
    if ((headerRow || innerRow) && topSpace) {
      const spacerTr = document.createElement("tr");
      spacerTr.classList.add("g__header-spacer");
      spacerTr.classList.add(`g__${index}`);
      const spacerTd = document.createElement("td");
      spacerTd.setAttribute("colspan", rowCount);
      spacerTr.appendChild(spacerTd);
      row.before(spacerTr);
    }
  });

  /*---------------------------------------------
    Conditional Search
    ---------------------------------------------*/
  function columnFilter(cell, index) {
    const filterDiv = document.createElement("div");
    filterDiv.classList.add("g__filter");

    const filterIcon = document.createElement("i");
    filterIcon.setAttribute("class", "fal fa-filter");
    filterDiv.appendChild(filterIcon);

    // Filter Dropdown Form
    const conditSelOpts = ["Greater Than", "Less Than", "Contains"];

    const conditForm = document.createElement("form");
    conditForm.id = "g__column-filter";

    const filter1 = document.createElement("div");
    filter1.classList.add("g__filter-1");
    conditForm.appendChild(filter1);

    const conditSel1 = document.createElement("select");
    conditSelOpts.forEach((val, index) => {
      let opt = document.createElement("option");
      opt.value = val;
      opt.innerHTML = val;
      conditSel1.appendChild(opt);
    });
    filter1.appendChild(conditSel1);

    // Input
    const conditVal1 = document.createElement("input");
    conditVal1.id = "g__column-input-1";
    filter1.appendChild(conditVal1);

    // And OR
    const andOr = document.createElement("div");
    andOr.classList.add("g__and-or");
    conditForm.appendChild(andOr);

    const andOrOpts = ["And", "Or", "none"];
    andOrOpts.forEach((val, index) => {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "andOr";
      radio.value = val.toLowerCase();
      let label = document.createElement("label");
      label.innerText = val;
      label.setAttribute("for", val.toLowerCase());
      andOr.appendChild(radio);
      andOr.appendChild(label);
    });

    //Filter 2
    const filter2 = document.createElement("div");
    filter2.classList.add("g__filter-2");
    conditForm.appendChild(filter2);

    const conditSel2 = document.createElement("select");
    conditSelOpts.forEach((val, index) => {
      let opt2 = document.createElement("option");
      opt2.value = val;
      opt2.innerHTML = val;
      conditSel2.appendChild(opt2);
    });
    filter2.appendChild(conditSel2);

    // Input 2
    const conditVal2 = document.createElement("input");
    conditVal2.id = "g__column-input-2";
    filter2.appendChild(conditVal2);

    //Filter Btn
    const filterBtn = document.createElement("button");
    filterBtn.type = "button";
    filterBtn.innerText = "Filter";
    filterBtn.addEventListener("click", () => {
      conditFilterBtn(conditSel1.value, conditVal1.value, index);
    });
    conditForm.appendChild(filterBtn);

    //Reset Btn
    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.innerText = "Reset";
    resetBtn.addEventListener("click", () => {
      let table = document.getElementById("g__" + id);
      let tr = table.getElementsByTagName("tr");
      for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = "";
      }
    });
    conditForm.appendChild(resetBtn);

    filterDiv.appendChild(conditForm);

    filterIcon.addEventListener("click", () => {
      conditForm.classList.toggle("g__show-filter");
    });

    return filterDiv;
  }

  // Search Event Listener
  //filters.appendChild(conditForm);

  function conditFilterBtn(sel, val1, index) {
    let filter1, cellVal;
    let table = document.getElementById("g__" + id);
    let tr = table.getElementsByTagName("tr");
    switch (sel) {
      case "Greater Than":
        filter1 = !!val1 ? Number(val1) : "";
        if (Number(filter1)) {
          for (let i = 0; i < tr.length; i++) {
            if (tr[i].classList.contains("g__row")) {
              let td = tr[i].getElementsByTagName("td");
              if (td[index]) {
                let orgVal = td[index].getAttribute("data-org-value");
                cellVal = Number(orgVal);
                if (cellVal > filter1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
            }
          }
        }
        break;
      case "Less Than":
        filter1 = !!val1 ? Number(val1) : "";
        if (Number(filter1)) {
          for (let i = 0; i < tr.length; i++) {
            if (!tr[i].classList.contains("g__header")) {
              let td = tr[i].getElementsByTagName("td");
              for (let j = 0; j < td.length; j++) {
                if (td[j]) {
                  cellVal =
                    Number(td[j].textContent) || Number(td[j].innerText);
                  if (cellVal < filter1) {
                    tr[i].style.display = "";
                    break;
                  } else {
                    tr[i].style.display = "none";
                  }
                }
              }
            }
          }
        }
        break;
      default:
        comparison = "===";
    }
  }
  /*---------------------------------------------
    Search
    ---------------------------------------------*/
  let search = document.createElement("input");
  search.type = "text";
  search.id = "search_" + id;
  search.placeholder = "Search...";
  // Search Event Listener
  search.addEventListener("input", () => {
    let filter = search.value.toUpperCase();
    let table = document.getElementById("g__" + id);
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
  // filters.appendChild(search);

  /*---------------------------------------------
    Dropdown Filter
    ---------------------------------------------*/
  let ddFilter = document.createElement("select");
  ddFilter.id = "ddFilter_" + id;
  let ddOptions = [
    "Select Quarter",
    "Donors Q1",
    "Donors Q2",
    "Donors Q3",
    "Donors Q4",
  ];
  ddOptions.forEach((val, index) => {
    let option = document.createElement("option");
    option.innerHTML = val;
    if (index === 0) {
      option.selected = true;
    }
    ddFilter.appendChild(option);
  });
  ddFilter.addEventListener("change", () => {
    let filter = ddFilter.value.toUpperCase();
    let table = document.getElementById("g__" + id);
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
  // filters.appendChild(ddFilter);

  /*---------------------------------------------
    Formatter
    ---------------------------------------------*/
  function formatValue(value, format, currency, symbol) {
    let val;
    switch (format) {
      case "percent":
        val = value + "%";
        break;
      case "currency":
        const formatCurrency = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency ? currency : "USD",
          minimumFractionDigits: 2,
        });
        val = formatCurrency.format(value);
        break;
      case "number":
        val = new Intl.NumberFormat().format(value);
        break;
      case "custom":
        val = val = value + symbol;
        break;
      default:
        val = new Intl.NumberFormat().format(value);
    }
    return val;
  }
  function conditionalRange(cell) {
    let val = cell.value;
    let max = cell.rangeMax;
    let split = cell.rangeSplit;
    let middle = max / split;
    if (val > middle) {
      return "g__high";
    } else if (val < middle) {
      return "g__low";
    }
  }

  /*---------------------------------------------
    Editable
    ---------------------------------------------*/
  function editable(cell) {
    return "<a href='#'>test</a>";
  }
  /*---------------------------------------------
    Column sort
    ---------------------------------------------*/
  function columnSort(e) {
    console.log(e.target);
  }
}
