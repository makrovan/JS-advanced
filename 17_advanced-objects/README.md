В этом задании нужно было разработать инструмент для разработчика, который предоставляет удобный интерфейс для просмотра полной цепочки наследования стандартных классов в JavaScript:

Разработайте инструмент, позволяющий вывести полную цепочку прототипов для любого класса, который содержится в глобальном объекте window.

Название класса должно указываться в поле для ввода.
Рядом с полем должна быть кнопка «Показать цепочку прототипов». При нажатии осуществляется проверка наличия класса в `window`, а также того, является ли свойство функцией-конструктором (`typeof window[input.value] === 'function'`). Ничего страшного, если значение является обычной функцией, для неё тоже можно вывести цепочку прототипов.
Если передано неверное название для класса или функции, поле должно подсветиться красным, обозначая ошибку.
Если название верное, то выводится список из прототипов в цепочке от непосредственного к базовому.
Цепочка прототипов должна выводиться в виде ol-списка, где указано название конструктора (`[прототип].constructor.name`) или строка `[Без названия]`, если у прототипа нет свойства `constructor`. Далее с помощью вложенного ol-списка нужно вывести все перечислимые `(enumerable)` свойства прототипа и их тип `(typeof)`.

Реализуйте возможность не только просматривать стандартные классы, но и загружать модули с помощью динамического импорта `(const module = await import('путь до модуля'))`. Можете использовать то же поле для ввода.

Если введённое значение заканчивается на `.js`, то считаем, что пользователь хочет загрузить класс из модуля. Тогда после нажатия на кнопку «Показать цепочку прототипов» попытайтесь загрузить указанный модуль. Если модуль успешно загружен, получите из него свойство `default` (`module.default`, то есть `export default` из модуля; предполагаем, что там расположен класс).
Если это класс, поступайте с ним точно так же — выведите всю его цепочку прототипов.
Если на любом из этапов что-то пошло не так (не получилось загрузить модуль, `default` не является классом), то, как и при ошибке ввода класса, подсветите поле красным.



### Пример работы программы и проверка результата

Пользователь вводит значение `"HTMLInputElement"` (класс для всех DOM-элементов `input`) в поле для ввода и нажимает кнопку «Показать цепочку прототипов».
Ниже выводится следующий список прототипов с их методами:
- HTMLInputElement — непосредственный прототип.
- HTMLElement — прототип родительского класса для всех HTML-элементов.
- Element — прототип родительского класса для любых элементов, включая HTML и SVG.
- Node — прототип родительского класса для любого узла в DOM-дереве.
- EventTarget — прототип родительского класса для всех объектов, которые могут иметь обработчики событий.
- Object — прототип базового класса для всех объектов в JavaScript.

# Запуск:
Для запуска используйте `docker run -d -p 3000:3000 makrov/oblect-prototype` -> http://localhost:3000

В образе для тестирования также имеется файл card.js, цепочку наследования внутри которого можно вывести в приложении