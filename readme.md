# webdevspace
**Сайт-портфолио webdev-space.com**

## Состав проекта
1. Jade (_doctype.jade, index.jade, includes)
2. Gulp (+plugins)
3. Sass (+mixins, variables, basic styles)
4. Modernizr.js (#2.8.2)
5. Normalize-css (#3.0.3)
6. jQuery (#2.1.4)
7. Foundation (#6.1.2)
8. Favicons, sprites, images, logos, fonts
9. Old browsers support ([if IE]: html5shiv, es5-shim, respond, jquery 1.12.0)

## Инструкция по установке, настройке и использованию
```
1. git clone https://github.com/sunndeath/webdevspace.git && cd webdevspace
2. npm i
3. bower i
4. gulp
5. настройка сборки, установка дополнительных плагинов и библиотек:
    - css-файлы установленных в dev/plugins/ компонентов подключаются непосредственно в main.scss для корректной конкатенации и компиляции в prod/css/main.min.css;
    - пути js-файлов, установленных в dev/plugins/ компонентов, необходимо скопировать в gulpfile.js для конкатенации и минификации в prod/js/plugins.main.js, либо подключать опционально;
    - favicon: копируются в dev/images/favicon/ и автоматически переносятся в prod/images/favicon/;
    - добавление шрифтов: шрифты копируются в dev/fonts/ для автоматического переноса в prod/fonts/, файлы стилей шрифтов - в dev/sass/_common/_fonts.scss, инклудятся в main.scss;
    - создание спрайтов: положить картинки в dev/images/sprites, набрать в консоли gulp sprite и получить dev/sass/sprite.scss и prod/images/sprite.png, прописать настройки в main.scss;
    - добавление картинок, лого: копируются в dev/images/ и автоматически переносятся в prod/images/ со сжатием.
```

## Структура проекта
```
├── dev/                       # Каталог разработки
│   ├── jade/                  # Индексные jade-файлы
│   │   └──_common/            # Подключаемые jade-файлы
│   ├── sass/                  # Главный sass-файл стилей
│   │   └──_common/            # Подключаемые sass-файлы
│   ├── images/                # Лого, фоны, картинки
│   ├── ├── favicon/           # Favicon
│   │   └── sprites/           # PNG-иконки для генерации растрового спрайта
│   ├── js/                    # Собственные js-файлы
│   ├── plugins/               # Установленные компоненты для продакшена
│   ├── fonts/                 # Кастомные шрифты
│   │
├── prod/                      # Каталог продакшена
│   ├── css/                   # Минифицированные и сконкатенированные стили
│   ├── fonts/                 # Шрифты
│   ├── images/                # Лого, фоны, картинки, спрайты
│   │   ├── favicon/           # Favicon
│   ├── js/              	   # Все js-файлы
│   │   ├── main.min.js        # Минифицированные и конкатенированные собственные js-файлы
│   │   └── plugins.min.js     # Минифицированные и конкатенированные js-файлы установленных библиотек
└── └── index.html             # Индексный файл
```
