document.onload = function() {

}

var _pricing = (function() {

    function init() {
        // var up = document.querySelectorAll(".up");
        // var down = document.querySelectorAll(".down")


        function _init() {
            evenListener();
        }

        function evenListener() {
            document.querySelectorAll('.question').forEach(function(elem) {
                elem.addEventListener('click', clickQuestion)
            })
        }

        function clickQuestion() {
            const thisItem = this.parentNode;
            document.querySelectorAll('.Accordion ul li').forEach(function(elem) {
                if (thisItem == elem) {
                    thisItem.classList.toggle('show')

                }

            })
        }


        return {
            _init
        }
    }

    var instance;
    return {
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;

        }
    }
})();
_pricing.getInstance()._init()