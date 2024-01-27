// ==UserScript==
// @name         Auction House Highlight Items
// @namespace    http://tampermonkey.net/
// @version      2024-01-27
// @description  Highlight the items that you can buy at the same/higher price when selling
// @author       Manito Ramos
// @match        *://*.gladiatus.gameforge.com/game/index.php?mod=auction*
// @downloadURL  https://github.com/manitoramos/GladiatusScripts/raw/main/scripts/ActionHouseHighlight.js
// @updateURL    https://github.com/manitoramos/GladiatusScripts/raw/main/scripts/ActionHouseHighlight.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gameforge.com
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

(function() {
    let item_type = $("select[name='itemType']").find(":selected").val()

    if(item_type != "9" && item_type != "6")
        return;

    $(".auction_bid_div input[name='bid_amount']").each((i,e) => {
        let bid_value = parseInt(e.value)
        let item_value = parseInt($(".auction_item_div .ui-droppable").eq(i).attr("data-tooltip").match(/\d+\.\d+ <div|\d+ <div/gs)[0].replace(".", ""))

        if(item_value >= bid_value){
            //Good to buy to hold gold on inventory
            $(".auction_bid_div").eq(i).parent().parent().css("background-color", "#FFFFA6")
            //console.log(item_value, bid_value)
        }
    })
})();