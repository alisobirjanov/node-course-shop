const toCurrency = price => {
  return new Intl.NumberFormat("uz-UZ", {
    currency: "uzs",
    style: "currency",
  }).format(price);
}


const toDate = (date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
};

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

document.querySelectorAll(".date").forEach((node) => {
  node.textContent = toDate(node.textContent);
});

const $card = document.querySelector(".korzina");
if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;

      fetch("/card/remove/" + id, {
        method: "delete",
        headers: {
          "X-XSRF-TOKEN": csrf
        },
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.courses.length) {
            const html = card.courses
              .map((c) => {
                return `
                <tr>
                  <th>${c.title}</th>
                  <th>${c.count}</th>
                  <th>
                    <button class="waves-effect waves-light btn-small js-remove" data-id="${c.id}" data-csrf="${card.csrf}">Удалить</button>
                  </th>
                </tr>
              `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = "<p>Корзина пуста<p>";
          }
        });
    }
  });
}

M.Tabs.init(document.querySelectorAll('.tabs'))


var toastHTML =
  document.getElementById("qwerty").textContent ||
  document.getElementById("qwerty2").textContent || null
M.toast({ html: toastHTML });

