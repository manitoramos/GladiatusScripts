// ==UserScript==
// @name         Inventory Value Gladiatus
// @namespace    http://tampermonkey.net/
// @version      2024-01-25
// @description  Calculate the Inventory Value
// @author       Manito Ramos
// @match        *://*.gladiatus.gameforge.com/game/index.php?mod=overview*
// @downloadURL  https://github.com/manitoramos/GladiatusScripts/raw/main/scripts/InventoryValue.js
// @updateURL    https://github.com/manitoramos/GladiatusScripts/raw/main/scripts/InventoryValue.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gameforge.com
// @grant        none
// ==/UserScript==

(function() {
    function formatMoney(value) {
        let decimalValue = value / 1000;
        let formattedValue = decimalValue.toFixed(3);
        return formattedValue;
    }

    function calcInv(){
        let value = 0
        document.querySelectorAll("#inv .ui-draggable-handle").forEach(e => {
            value += parseInt(e.getAttribute("data-tooltip").match(/\d+\.\d+ <div|\d+ <div/gs)[0].replace(".", ""))
        })
        value = "Inventory Value: " + formatMoney(value)
        if(document.querySelector(".inv_value") == null){
            document.querySelector("#inv").insertAdjacentHTML('afterend', `<div style="text-align: center;height: 18px;width: 256px;margin: 5px 20px;">
            <div style="width:256px; text-align:center; color: rgb(0, 128, 0);" class="bag_duration inv_value">${value} <img alt="" src="//gf1.geo.gfsrv.net/cdn6b/71e68d38f81ee6f96a618f33c672e0.gif" title="Ouro" align="absmiddle" border="0"></div></div>`)
        }else{
            document.querySelector(".inv_value").innerHTML = value + ' <img alt="" src="//gf1.geo.gfsrv.net/cdn6b/71e68d38f81ee6f96a618f33c672e0.gif" title="Ouro" align="absmiddle" border="0">'
        }
    }
    calcInv()

    var targetNode = document.getElementById('inv');
    var config = { attributes: true, childList: true, subtree: true };

    var callback = function(mutationsList, observer) {
        calcInv()
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
})();