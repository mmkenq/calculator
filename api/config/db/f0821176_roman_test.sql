-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 10.0.2.30
-- Время создания: Авг 04 2023 г., 12:06
-- Версия сервера: 5.7.37-40
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `f0821176_roman_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `calc_category`
--

CREATE TABLE `calc_category` (
  `category_id` int(64) NOT NULL,
  `category_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_category`
--

INSERT INTO `calc_category` (`category_id`, `category_name`) VALUES
(1, 'Грунт'),
(2, 'Песок'),
(3, 'Битум'),
(4, 'Цемент'),
(5, 'Щебень'),
(6, 'Доска'),
(7, 'Кирпич');

-- --------------------------------------------------------

--
-- Структура таблицы `calc_material`
--

CREATE TABLE `calc_material` (
  `material_id` int(64) NOT NULL,
  `material_category_id` int(64) NOT NULL,
  `material_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `material_unit_id` int(64) NOT NULL,
  `material_unit_price` int(64) NOT NULL,
  `material_img_id` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_material`
--

INSERT INTO `calc_material` (`material_id`, `material_category_id`, `material_name`, `material_unit_id`, `material_unit_price`, `material_img_id`) VALUES
(1, 1, 'Грунт СУПЕСЧАНЫЙ', 3, 100, 1),
(2, 2, 'Природный песок аллювиальный', 3, 150, 0),
(3, 2, 'Природный песок делювиальный', 3, 250, 0),
(4, 3, 'Битум торфяной', 5, 250, 0),
(5, 5, 'Диоритовый щебень', 3, 250, 0),
(6, 6, 'Доска ДУБ', 1, 105, 0),
(7, 7, 'Кирпич силикатный', 1, 200, 0),
(8, 4, 'Портландцемент', 3, 200, 0),
(9, 7, 'Кирпич керамический', 1, 205, 0),
(10, 6, 'Доска СОСНА', 1, 100, 0),
(11, 6, 'Доска БЕРЁЗА', 1, 115, 0),
(12, 6, 'Доска ЕЛЬ', 1, 110, 0),
(13, 6, 'Доска КЕДР', 1, 100, 0),
(14, 6, 'Доска ТОПОЛЬ', 1, 100, 0),
(15, 1, 'Грунт ГЛИНИСТЫЙ', 3, 100, 2),
(16, 1, 'Грунт ИЗВЕСТКОВЫЙ', 3, 120, 0),
(17, 1, 'Грунт СУГЛИНИСТЫЙ', 3, 105, 0),
(18, 1, 'Грунт ТОРФЯНОЙ', 3, 150, 0),
(19, 1, 'Грунт ЧЕРНОЗЕМНЫЙ', 3, 250, 0),
(20, 5, 'Гранитный щебень', 3, 300, 0),
(21, 5, 'Габбро щебень', 3, 350, 0),
(22, 5, 'Базальтовый щебень', 3, 350, 0),
(23, 5, 'Долеритовый щебень', 3, 350, 0),
(24, 5, 'Диабазовый щебень', 3, 350, 0),
(25, 5, 'Пироксенитовый щебень', 3, 350, 0),
(26, 5, 'Андезитовый щебень', 3, 350, 0),
(27, 5, 'Сиенитовый щебень', 3, 350, 0),
(28, 5, 'Горнблендитовый щебень', 3, 350, 0),
(29, 5, 'Дунитовый щебень', 3, 350, 0),
(30, 5, 'Туфовый щебень', 3, 350, 0),
(31, 5, 'Пемзовый щебень', 3, 350, 0),
(32, 2, 'Природный песок морской', 3, 250, 0),
(33, 2, 'Природный песок озерный', 3, 400, 0),
(34, 2, 'Природный песок эоловый', 3, 275, 0),
(35, 2, 'Природный песок флювиогляциальный', 3, 275, 0),
(36, 2, 'Искусственный песок термозитовый', 3, 300, 0),
(37, 2, 'Искусственный песок перлитовый', 3, 300, 0),
(38, 2, 'Искусственный песок кварцевый', 3, 300, 0),
(39, 2, 'Искусственный песок керамзитовый', 3, 300, 0),
(40, 2, 'Искусственный песок мраморный', 3, 300, 0),
(41, 2, 'Искусственный песок известняковый', 3, 300, 0),
(42, 2, 'Искусственный песок доломитовый', 3, 300, 0),
(43, 3, 'Битум угольный', 5, 400, 0),
(44, 3, 'Битум нефтяной', 5, 500, 0),
(45, 4, 'Портландцемент с минералами', 3, 200, 0),
(46, 4, 'Пуццолановый цемент', 3, 260, 0),
(47, 4, 'Шлакопортландцемент', 3, 250, 0),
(48, 4, 'Композиционный цемент', 3, 250, 0),
(49, 7, 'Кирпич шамотный (огнеупорный)', 1, 300, 0),
(50, 7, 'Кирпич гиперпрессованный', 1, 500, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `calc_material_img`
--

CREATE TABLE `calc_material_img` (
  `img_id` int(64) NOT NULL,
  `img_src` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_material_img`
--

INSERT INTO `calc_material_img` (`img_id`, `img_src`) VALUES
(1, 'assets/materials/supes.jpg'),
(2, 'assets/materials/glinist.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `calc_order`
--

CREATE TABLE `calc_order` (
  `order_id` int(64) NOT NULL,
  `order_user_token` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `order_provider_id` int(64) NOT NULL,
  `order_documents_ids` int(64) NOT NULL,
  `order_materials_ids` int(64) NOT NULL,
  `order_material_score` int(64) NOT NULL,
  `order_material_amount` int(64) NOT NULL,
  `order_unit_value` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `order_date` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `calc_unit`
--

CREATE TABLE `calc_unit` (
  `unit_id` int(64) NOT NULL,
  `unit_material_name` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_unit`
--

INSERT INTO `calc_unit` (`unit_id`, `unit_material_name`) VALUES
(1, 'шт'),
(2, 'гр'),
(3, 'кг'),
(4, 'т'),
(5, 'л');

-- --------------------------------------------------------

--
-- Структура таблицы `calc_user`
--

CREATE TABLE `calc_user` (
  `user_id` int(128) NOT NULL,
  `user_token` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_user`
--

INSERT INTO `calc_user` (`user_id`, `user_token`, `user_is_active`) VALUES
(1, '24195e72', 1),
(2, '24195e76', 1),
(14, '24482df9', 1),
(16, 'asdf234', 1),
(22, 'bc4a3d13', 1),
(25, '24195e75', 1),
(28, 'a', 1),
(29, 's', 1),
(33, 'e9e56a0d', 1),
(34, 'a8e5bbea', 1),
(35, 'ba9152cf', 1),
(37, '7180369d', 1),
(40, 'c43a9c72', 1),
(41, '2e58c4d1', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `calc_category`
--
ALTER TABLE `calc_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Индексы таблицы `calc_material`
--
ALTER TABLE `calc_material`
  ADD PRIMARY KEY (`material_id`) USING BTREE;

--
-- Индексы таблицы `calc_material_img`
--
ALTER TABLE `calc_material_img`
  ADD PRIMARY KEY (`img_id`);

--
-- Индексы таблицы `calc_order`
--
ALTER TABLE `calc_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Индексы таблицы `calc_unit`
--
ALTER TABLE `calc_unit`
  ADD PRIMARY KEY (`unit_id`);

--
-- Индексы таблицы `calc_user`
--
ALTER TABLE `calc_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_token` (`user_token`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `calc_category`
--
ALTER TABLE `calc_category`
  MODIFY `category_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `calc_material`
--
ALTER TABLE `calc_material`
  MODIFY `material_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT для таблицы `calc_material_img`
--
ALTER TABLE `calc_material_img`
  MODIFY `img_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `calc_order`
--
ALTER TABLE `calc_order`
  MODIFY `order_id` int(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `calc_unit`
--
ALTER TABLE `calc_unit`
  MODIFY `unit_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `calc_user`
--
ALTER TABLE `calc_user`
  MODIFY `user_id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
