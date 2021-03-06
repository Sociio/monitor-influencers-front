import * as colors from "@material-ui/core/colors";
import _ from "lodash";

class FuseUtils {
  static filterArrayByString(mainArr, searchText) {
    if (searchText === "") {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter(itemObj => {
      return this.searchInObj(itemObj, searchText);
    });
  }

  static kFormatter(num) {
    return num > 999 ? (num / 1000).toFixed(0) + "k" : num;
  }

  static camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  static makeTitle(string) {
    let title = string.charAt(0).toUpperCase() + string.slice(1);
    return title.replace("_", " ");
  }

  static formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }

  static searchInObj(itemObj, searchText) {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  static searchInArray(arr, searchText) {
    for (const value of arr) {
      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  static searchInString(value, searchText) {
    return value.toLowerCase().includes(searchText);
  }

  static generateGUID() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  static toggleInArray(item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static handleize(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/\W+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  static setRoutes(config) {
    let routes = [...config.routes];

    if (config.settings || config.auth) {
      routes = routes.map(route => {
        let auth = config.auth ? [...config.auth] : [];
        auth = route.auth ? [...auth, ...route.auth] : auth;
        return {
          ...route,
          settings: { ...config.settings, ...route.settings },
          auth
        };
      });
    }

    return [...routes];
  }

  static generateRoutesFromConfigs(configs) {
    let allRoutes = [];
    configs.forEach(config => {
      allRoutes = [...allRoutes, ...this.setRoutes(config)];
    });
    return allRoutes;
  }

  static findById(o, id) {
    //Early return
    if (o.id === id) {
      return o;
    }
    let result, p;
    for (p in o) {
      if (o.hasOwnProperty(p) && typeof o[p] === "object") {
        result = this.findById(o[p], id);
        if (result) {
          return result;
        }
      }
    }
    return result;
  }

  static getFlatNavigation(navigationItems, flatNavigation) {
    flatNavigation = flatNavigation ? flatNavigation : [];
    for (const navItem of navigationItems) {
      if (navItem.type === "subheader") {
        continue;
      }

      if (navItem.type === "item") {
        flatNavigation.push({
          id: navItem.id,
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url
        });

        continue;
      }

      if (navItem.type === "collapse" || navItem.type === "group") {
        if (navItem.children) {
          this.getFlatNavigation(navItem.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  static randomMatColor(hue) {
    hue = hue ? hue : "400";
    const mainColors = [
      "red",
      "pink",
      "purple",
      "deepPurple",
      "indigo",
      "blue",
      "lightBlue",
      "cyan",
      "teal",
      "green",
      "lightGreen",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deepOrange"
    ];
    const randomColor = mainColors[Math.floor(Math.random() * mainColors.length)];
    return colors[randomColor][hue];
  }

  static difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function(result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] = _.isObject(value) && _.isObject(base[key]) ? changes(value, base[key]) : value;
        }
      });
    }

    return changes(object, base);
  }

  static currentDateFormat(addDays = 0, addMonths = 0) {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1 + addMonths).toString();
    var d = (x.getDate() + addDays).toString();
    d.length === 1 && (d = "0" + d);
    m.length === 1 && (m = "0" + m);
    var yyyymmdd = `${y}-${m}-${d}`;
    return yyyymmdd;
  }
}

export default FuseUtils;
