-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 10.0.0.57
-- Время создания: Май 21 2023 г., 20:21
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
-- База данных: `f0799633_roman_test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `calc_material`
--

CREATE TABLE `calc_material` (
  `material_id` int(64) NOT NULL,
  `material_classes_ids` int(64) NOT NULL,
  `material_groups_ids` int(64) NOT NULL,
  `material_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `material_unit_id` int(64) NOT NULL,
  `material_unit_price` int(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `calc_material`
--

INSERT INTO `calc_material` (`material_id`, `material_classes_ids`, `material_groups_ids`, `material_name`, `material_unit_id`, `material_unit_price`) VALUES
(1, 1, 1, 'Грунт', 3, 100),
(2, 1, 1, 'Песок', 3, 150),
(3, 1, 1, 'Цемент', 3, 250),
(4, 1, 1, 'Битум', 3, 225),
(5, 1, 1, 'Щебень', 3, 300);

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
-- Индексы таблицы `calc_material`
--
ALTER TABLE `calc_material`
  ADD PRIMARY KEY (`material_id`);

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
-- AUTO_INCREMENT для таблицы `calc_material`
--
ALTER TABLE `calc_material`
  MODIFY `material_id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
