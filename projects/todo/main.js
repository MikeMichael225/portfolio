(function () {
    var container = document.querySelector('.container');
    var input = document.querySelector('.input-title');
    var button = document.querySelector('.todo-add');
    var divCount = (document.cookie) ? document.cookie.split(';').length : 0;

    (function () {
        button.addEventListener('click', addTodo);

        function addTodo() {
            var div = document.createElement('div');
            div.setAttribute('class', `todo-entry entry-${divCount}`);
            div.innerHTML = `
                <span class="todo-title">
                    ${input.innerText}
                </span>
                <button onclick='
                    document.querySelector(".entry-${divCount}").style.display="none"
                    document.cookie = "entry-${divCount}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                ' class='todo-button todo-remove'>DONE</button>
            `
            container.appendChild(div)
            document.cookie = `entry-${divCount}=${input.innerText}; expires=${expireDate(365)}; path=/`;
            divCount++;
        }
    }());

    (function () {
        var entries = document.cookie.split(';').map((value) => {
            if (!value.includes('divCount'))
                return value.trim();
        })

        for (x in entries) {
            if (entries[x] && entries[x] !== '0')
                addTodo(entries[x], x);
        }

        function addTodo(entry) {
            var entryName = entry.substring(0, entries[0].indexOf('='))
            var div = document.createElement('div');
            div.setAttribute('class', `todo-entry ${entryName}`);
            div.innerHTML = `
                <span class="todo-title">
                    ${getCookie(`${entryName}`)}
                </span>
                <button onclick='
                    document.querySelector(".${entryName}").style.display="none";
                    document.cookie = "${entryName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                ' class='todo-button todo-remove'>DONE</button>
            `
            container.appendChild(div)
        }
    }());

    function expireDate(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        console.log(result)
        return result;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return 0;
    }
}());