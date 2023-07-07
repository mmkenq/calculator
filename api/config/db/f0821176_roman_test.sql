-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 10.0.2.30
-- Время создания: Июн 19 2023 г., 19:02
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
  `material_unit_price` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_material`
--

INSERT INTO `calc_material` (`material_id`, `material_category_id`, `material_name`, `material_unit_id`, `material_unit_price`) VALUES
(1, 1, 'Грунт СУПЕСЧАНЫЙ', 3, 100),
(2, 2, 'Песок ЖЕЛТЫЙ', 3, 150),
(3, 2, 'Песок СИНИЙ', 3, 250),
(4, 3, 'Битум 50%', 3, 225),
(5, 5, 'Щебень', 3, 300),
(6, 6, 'Доска ДУБ', 1, 105),
(7, 7, 'Кирпич КРАСНЫЙ', 1, 200),
(8, 4, 'Цемент', 3, 200),
(9, 7, 'Кирпич БЕЛЫЙ', 1, 205),
(10, 6, 'Доска СОСНА', 1, 100),
(11, 6, 'Доска БЕРЁЗА', 1, 115),
(12, 6, 'Доска ЕЛЬ', 1, 110),
(13, 6, 'Доска КЕДР', 1, 100),
(14, 6, 'Доска ТОПОЛЬ', 1, 100),
(15, 1, 'Грунт ГЛИНИСТЫЙ', 3, 100),
(16, 1, 'Грунт ИЗВЕСТКОВЫЙ', 3, 120),
(17, 1, 'Грунт СУГЛИНИСТЫЙ', 3, 105),
(18, 1, 'Грунт ТОРФЯНОЙ', 3, 150),
(19, 1, 'Грунт ЧЕРНОЗЕМНЫЙ', 3, 250);

-- --------------------------------------------------------

--
-- Структура таблицы `calc_order`
--

CREATE TABLE `calc_order` (
  `order_id` int(64) NOT NULL,
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
(4, 'т');

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
  MODIFY `material_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `calc_order`
--
ALTER TABLE `calc_order`
  MODIFY `order_id` int(64) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `calc_unit`
--
ALTER TABLE `calc_unit`
  MODIFY `unit_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
