# Материалы редизайна

## Версия 05 — каталог из 18 ароматов

PNG-файлы в `assets/catalog/` сгенерированы image_gen по названиям из таблицы клиента. Это прозрачные визуализации для интерфейса, а не подтверждённые фотографии товара или гарантия точного соответствия фирменной упаковке. Killer, Musk Kashmir и «Феромон мужской» оформлены как самостоятельные концепции без выдуманного производителя. Файлы уменьшены до 720×720 без добавления фона.

| Файл | Исходный PNG в /workspace/generated_images |
| --- | --- |
| amouage-guidance.png | exec-bca0bb81-d177-4c14-aca3-9d4d07746d4e.png |
| miss-dior.png | exec-5a6d2b1d-69b4-4b59-9f9b-f4c2a47333ab.png |
| good-girl-blush.png | exec-59b6d6c8-7f65-4524-be42-3aef768412c4.png |
| good-girl-gone-bad.png | exec-2551c14b-015f-4b4b-b734-fd827f0845dc.png |
| lattafa-yara.png | exec-8304d4d3-deab-4e7a-88c8-0fa8cd4025dd.png |
| ange-ou-demon.png | exec-6e6ef7c7-970e-46a2-9a07-d074b2180398.png |
| so-sexy.png | exec-5be85c6c-255d-44c8-b02f-686cdd5f11cc.png |
| modern-princess.png | exec-b69e47e4-2b0c-43ef-a482-02a85540d03b.png |
| killer.png | exec-e2fed559-4022-417b-8f99-861db4f31809.png |
| musk-kashmir.png | exec-3ffbbd24-1381-45fa-a047-6fa710046afb.png |
| aqua-blue.png | exec-583faed2-535f-40b8-b271-7c69580cb660.png |
| creed-absolu-aventus.png | exec-4615aaf2-b528-490d-89c4-6b3efea01de9.png |
| clive-hedonistic.png | exec-4b142f82-0685-43bc-bf1f-895d151dc0fe.png |
| dior-cologne.png | exec-bc662499-e821-4388-a557-c6f12812cd0b.png |
| pheromone-men.png | exec-558b3807-b3aa-40e3-91d2-211a3798c26a.png |
| lv-imagination.png | exec-4b922356-d8a5-4931-8ed4-e4cc6712aaf1.png |
| lv-symphony.png | exec-b71959e8-aaa6-48c3-8914-2bd3a9ae44e0.png |
| bvlgari-tygar.png | exec-009f37b6-e275-4a3f-b71a-69208bbc7140.png |

## Версия 03 — тёмная парфюмерная концепция

Пять новых изображений сгенерированы image_gen по просьбе пользователя. Они являются визуализациями, не подтверждёнными фотографиями оригинальных флаконов. Точная геометрия упаковки требует сверки. Pheramone изображён в условной упаковке: пользователь подтвердил только название. Происхождение самой парфюмерии ещё уточняется у клиента. Доступ к parfbar.kz и Clive Christian блокировал сетевой прокси среды (403 CONNECT); никаких данных этих сайтов использовано не было.

| Файл | Исходный PNG в /workspace/generated_images |
| --- | --- |
| imagination.webp | exec-05eddb52-d043-41b4-8eb9-94c6478f6c16.png |
| tygar.webp | exec-234e0afe-c82c-44dc-a63b-858d99645b30.png |
| hedonistic.webp | exec-b3eff897-0965-44b7-8089-d3898cce1621.png |
| absolu.webp | exec-92749a07-09d0-4b25-9e5c-8fe5143c6a50.png |
| pheramone.webp | exec-86d9a4f1-f352-4dbb-b59e-5cbb4f868e2c.png |

WebP-версии подготовлены скриптом `scripts/prepare-noir-images.cjs`, уменьшение/сжатие без изменения содержания. Главная страница использует `campaign.webp` из предыдущей серии для объяснения формата сетов.

## Предыдущая серия

Все четыре предметные фотографии созданы инструментом image_gen по прямому запросу заказчика. Они иллюстрируют предполагаемую упаковку и настроение, не являются фотографиями фактического товара, отзывами или подтверждением наличия.

| Файл | Исходник в /workspace/generated_images | Назначение |
| --- | --- | --- |
| campaign.webp | exec-934f9d17-8302-4662-877e-ba2ed625f78c.png | Два бокса, основной экран |
| daylight.webp | exec-4434426a-874c-4e9e-b1fb-ef080865b0fa.png | Свежая дневная композиция |
| after-hours.webp | exec-f53e395d-1987-457b-8dab-9070c68163c2.png | Вечерняя композиция на бордовом шёлке |
| signature.webp | exec-09b7a79d-2671-4d45-b561-c14711dfe466.png | Древесная композиция |

WebP — уменьшенные для веб-доставки версии без изменений содержания. Общий размер около 373 КБ. Повторная оптимизация: `node scripts/prepare-images.cjs` (использует Sharp, доступный в текущей облачной среде).

Manrope 400/600 и лицензия SIL Open Font License скопированы из пользовательского референса https://github.com/lpshvn-webcode/kuchen-technik-nobilia, коммит ee785c962a0387d394b11cafeaad88a331a18652. Фотографии кухни не использованы. Старый `perfume-set.svg` сохранён, но на странице не используется.
