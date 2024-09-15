export const exportPageHTML = `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <META HTTP-EQUIV="Content-language" CONTENT="uk">
    <META name="author" content="ПП Політек-Софт" />
    <META name="description" content="ПС-Розклад" />
    <title>Fake ПС-Розклад експорт</title>
</head>

<body>

    <body onLoad="disabling();">
        Ви маєте можливість експортувати розклад з програми "ПС-Розклад", задавши наступні параметри: <table border="1">
            <tr>
                <td rowspan="3">req_mode</td>
                <td colspan="3">req_mode=group</td>
                <td>групи</td>
            </tr>
            <tr>
                <td colspan="3">req_mode=teacher</td>
                <td>викладачі</td>
            </tr>
            <tr>
                <td colspan="3">req_mode=room</td>
                <td>аудиторії</td>
            </tr>
            <tr>
                <td rowspan="20">req_type</td>
                <td colspan="3">req_type=obj_list</td>
                <td rowspan="2">перелік груп по факультетах/викладачів по кафедрах/аудиторій по корпусах</td>
            </tr>
            <tr>
                <td>Дод. параметри<br>для<br>req_type=<br>obj_list</td>
                <td>show_ID=yes</td>
                <td>виводити ID</td>
            </tr>
            <tr>
                <td colspan="3">req_type=rozklad</td>
                <td rowspan="10">розклад груп/викладачів/аудиторій</td>
            </tr>
            <tr>
                <td rowspan="9">Дод. параметри<br>для<br>req_type=<br>rozklad</td>
                <td>begin_date</td>
                <td>дата почтаку періоду</td>
            </tr>
            <tr>
                <td>end_date</td>
                <td>дата кінця періоду</td>
            </tr>
            <tr>
                <td>show_empty=yes</td>
                <td>показувати пусті дні (за промовчанням=no)</td>
            </tr>
            <tr>
                <td>ros_text</td>
                <td>=united - сформований текст (за промовчанням) <br>або<br>=separated - окремі стовпчики</td>
            </tr>
            <tr>
                <td>all_stream_components=yes</td>
                <td>показувати повний склад потоку (тільки для separated)(за промовчанням=no)</td>
            </tr>
            <tr>
                <td rowspan="4">OBJ_ID<br>abo<br>OBJ_name<br>abo<br>dep_name</td>
                <td>OBJ_ID - розклад по ID</td>
            </tr>
            <tr>
                <td>OBJ_name - розклад по назві групи/ПІБ/назві аудиторії (якщо ID не заповнено)</td>
            </tr>
            <tr>
                <td>dep_name - розклад по назві підрозділу (факультет/кафедра/корпус) (якщо назва та ID об'єкта не
                    заповнені; видає розклад тільки на 1 день)</td>
            </tr>
            <tr>
                <td>dep_name=all виводить весь розклад закладу (видає розклад тільки на 1 день; all працює тільки з
                    дозволу Адміністратора)</td>
            </tr>
            <tr>
                <td colspan="3">req_type=free_rooms_list</td>
                <td rowspan="7">перелік вільних аудиторій</td>
            </tr>
            <tr>
                <td rowspan="6">Дод. параметри<br>для<br>req_type=<br>free_rooms_list</td>
                <td>rooms_date</td>
                <td>дата</td>
            </tr>
            <tr>
                <td>lesson</td>
                <td>номер пари</td>
            </tr>
            <tr>
                <td>block_name</td>
                <td>назва корпусу</td>
            </tr>
            <tr>
                <td>room_type</td>
                <td>тип аудиторії (доп. тільки ті типи, які створені у даному ВНЗ)</td>
            </tr>
            <tr>
                <td>size_min</td>
                <td>кількість місць не менш ніж</td>
            </tr>
            <tr>
                <td>size_max</td>
                <td>кількість місць не більш ніж</td>
            </tr>
            <tr>
                <td colspan="3">req_type=room_type_list</td>
                <td>перелік типів аудиторій</td>
            </tr>
            <tr>
                <td rowspan="4">req_format</td>
                <td colspan="3">req_format=html</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="3">req_format=xml</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="3">req_format=json</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="3">req_format=iCal</td>
                <td>(тільки для req_type=rozklad)</td>
            </tr>
            <tr>
                <td rowspan="2">coding_mode</td>
                <td colspan="3">coding_mode=WINDOWS-1251</td>
                <td>WINDOWS-1251</td>
            </tr>
            <tr>
                <td colspan="3">coding_mode=UTF8</td>
                <td>UTF8</td>
            </tr>
        </table> <br> Коди помилок, які може повертати запит (Код у полі code, опис у error_message):<br>
        <table border="1">
            <tr>
                <td>code=-200</td>
                <td>Не має доступу до сервера або помилка доступу до бази даних</td>
            </tr>
            <tr>
                <td>code=-100</td>
                <td>Помилка у роботі модуля, зверніться до розробника</td>
            </tr>
            <tr>
                <td>code=-90</td>
                <td>Об'єкт, для якого потрібно показати розклад, не знайдено</td>
            </tr>
            <tr>
                <td>code=-80</td>
                <td>Неправильний режим (помилка у параметрі req_mode або req_type)</td>
            </tr>
            <tr>
                <td>code=-70</td>
                <td>Помилка у датах</td>
            </tr>
            <tr>
                <td>code=-60</td>
                <td>Помилка у параметрах</td>
            </tr>
            <tr>
                <td>code=-6</td>
                <td>Вигрузка всього розкладу разом заборонена Адмiнiстратором</td>
            </tr>
            <tr>
                <td>code=-5</td>
                <td>Технічні роботи на сервері</td>
            </tr>
            <tr>
                <td>code=-4</td>
                <td>За даним запитом нічого не знайдено</td>
            </tr>
            <tr>
                <td>code=-3</td>
                <td>Перегляд розкладу на вказані дати заблоковано адміністратором (Розклад у процесі складання і ще не
                    готовий для демонстрації)</td>
            </tr>
            <tr>
                <td>code=-2</td>
                <td>Перегляд розкладу заблоковано адміністратором (Розклад у процесі складання і ще не готовий для
                    демонстрації)</td>
            </tr>
            <tr>
                <td>code=-1</td>
                <td>Розклад у базі відсутній</td>
            </tr>
        </table> <br> У формі, яку наведено нижче, можна протестувати можливості експорту: <form
            enctype="application/x-www-form-urlencoded" action=" " name="select_form" id="select_form">
            <table id="utable" border=1>
                <tr>
                    <td colspan="1"><input type="radio" NAME="req_type" value="obj_list" id="req_type1"
                            onclick="disabling()"><label for="req_type1">Перелік викладачів/груп/аудиторій</label></td>
                    <td colspan="3"><input type="radio" NAME="req_type" value="rozklad" id="req_type2" checked
                            onclick="disabling()"><label for="req_type2">Розклад</label></td>
                    <td><input type="radio" disabled NAME="req_type" value="free_rooms_list" id="req_type3"
                            onclick="disabling()"><label for="req_type3">Перелік вільних аудиторій</label></td>
                    <td><input type="radio" disabled NAME="req_type" value="room_type_list" id="req_type4"
                            onclick="disabling()"><label for="room_type_list1">Перелік типів аудиторій</label></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <center><input type="radio" NAME="req_mode" value="group" id="req_mode1" checked><label
                                for="req_mode1">групи</label> <input type="radio" NAME="req_mode" value="teacher"
                                id="req_mode2"><label for="req_mode2">викладачі</label> <input type="radio"
                                NAME="req_mode" value="room" id="req_mode3"><label for="req_mode3">аудиторії</label>
                        </center>
                    </td>
                    <td align="center"><br><b>для вільних аудиторій</b></td>
                    <td rowspan="9">&nbsp; </td>
                </tr>
                <tr>
                    <td rowspan="8"><b>для Переліку</b><input type="checkbox" NAME="show_ID" value="yes"
                            id="show_ID"><label for="show_ID">Виводити ID</label></td>
                    <td colspan="3" align="center"><br><b>для Розкладу</b></td>
                    <td>Назва корпусу</td>
                </tr>
                <tr>
                    <td rowspan="3"> Введіть ID групи/викладача/Ауд. </td>
                    <td rowspan="3"> або (якщо ID не заповнено) точну назву/ПІБ </td>
                    <td rowspan="3"> або (якщо назва та ID об'єкта не заповнені; тільки на 1 день) точну назву
                        підрозділа або слово all (all працює тільки за дозволу Адміністратора ) </td>
                    <td> <input id="block_name" name="block_name" type="text" style="width:300pt; " disabled="true">
                    </td>
                </tr>
                <tr>
                    <td> Мiсць не менш нiж <input id="size_min" name="size_min" type="text" style="width:80pt; "
                            disabled="true"> </td>
                <tr>
                    <td> Мiсць не бiльш нiж<input id="size_max" name="size_max" type="text" style="width:80pt; "
                            disabled="true"> </td>
                <tr>
                    <td> <input id="OBJ_ID" name="OBJ_ID" type="text" style="width:50pt; "> </td>
                    <td> <input id="OBJ_name" name="OBJ_name" type="text" style="width:150pt; "> </td>
                    <td> <input id="dep_name" name="dep_name" type="text" style="width:300pt; "> </td>
                    <td> Тип<input id="room_type" name="room_type" type="text" style="width:300pt; " disabled="true">
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><input disabled type="radio" NAME="ros_text" value="united" id="ros_text1"
                            onclick="disabling()"><label for="ros_text1">Розклад - сформований текст</label></td>
                    <td><input type="radio" NAME="ros_text" value="separated" id="ros_text2" checked
                            onclick="disabling()"><label for="ros_text2">Розклад окремими стовпчиками</label></td>
                    <td>Дата <input id="begin_date1" name="begin_date" type="text" style="width:80pt; " disabled="true">
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><input disabled type="checkbox" NAME="show_empty" value="yes" id="show_empty"><label
                            for="show_empty">Показувати пусті дні</label> <input type="checkbox"
                            NAME="all_stream_components" value="yes" id="all_stream_components"><label
                            for="all_stream_components">Показувати повний склад потоку</label> </td>
                    <td>Номер пари <input id="lesson" name="lesson" type="text" style="width:80pt; " disabled="true">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">Дата початку<input id="begin_date0" name="begin_date" type="text"
                            style="width:80pt; "></td>
                    <td colspan="1">Дата закінчення<input id="end_date" name="end_date" type="text"
                            style="width:80pt; "></td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="6"><br><b>format</b></td>
                </tr>
                <tr>
                    <td><input disabled type="radio" id="req_format1" NAME="req_format" value="html"
                            onclick="disabling()"><label for="req_format1">html</label></td>
                    <td><input disabled type="radio" id="req_format2" NAME="req_format" value="xml"
                            onclick="disabling()"><label for="req_format2">xml</label< /td>
                    <td><input type="radio" id="req_format3" NAME="req_format" value="json" checked
                            onclick="disabling()"><label for="req_format3">json (рекоменд. UTF8)</label< /td>
                    <td colspan="3"><input disabled type="radio" id="_req_format4" NAME="req_format" value="iCal"
                            onclick="disabling()"><label for="req_format4">iCal (тільки для Розкладу)</label< /td>
                </tr>
                <tr>
                    <td colspan="6"><b>coding</b></td>
                </tr>
                <tr>
                    <td colspan="2"><input disabled type="radio" NAME="coding_mode" value="WINDOWS-1251"
                            id="coding_mode1"><label for="coding_mode1">WINDOWS-1251</label></td>
                    <td colspan="4"><input type="radio" NAME="coding_mode" value="UTF8" id="coding_mode2" checked><label
                            for="coding_mode2">UTF8</label></td>
                </tr>
            </table> <br> <input type="submit" value="ok" ID="bs" name="bs" style="width:150pt; font-weight:bold;">
            <script>
                function disabling() { document.select_form.bs.disabled = false; if (document.select_form.req_type1.checked) { document.select_form.show_ID.disabled = false; document.select_form.req_format4.disabled = true; document.select_form.OBJ_ID.disabled = true; document.select_form.OBJ_name.disabled = true; document.select_form.dep_name.disabled = true; document.select_form.ros_text1.disabled = true; document.select_form.ros_text2.disabled = true; document.select_form.begin_date0.disabled = true; document.select_form.end_date.disabled = true; document.select_form.block_name.disabled = true; document.select_form.size_min.disabled = true; document.select_form.size_max.disabled = true; document.select_form.room_type.disabled = true; document.select_form.show_empty.disabled = true; document.select_form.all_stream_components.disabled = true; document.select_form.lesson.disabled = true; document.select_form.begin_date1.disabled = true; if (document.select_form.req_format4.checked) document.select_form.req_format1.checked = true; } else if (document.select_form.req_type3.checked) { document.select_form.show_ID.disabled = true; document.select_form.req_format4.disabled = true; document.select_form.OBJ_ID.disabled = true; document.select_form.OBJ_name.disabled = true; document.select_form.dep_name.disabled = true; document.select_form.ros_text1.disabled = true; document.select_form.ros_text2.disabled = true; document.select_form.begin_date0.disabled = true; document.select_form.show_empty.disabled = true; document.select_form.all_stream_components.disabled = true; document.select_form.end_date.disabled = true; document.select_form.block_name.disabled = false; document.select_form.size_min.disabled = false; document.select_form.size_max.disabled = false; document.select_form.room_type.disabled = false; document.select_form.lesson.disabled = false; document.select_form.begin_date1.disabled = false; if (document.select_form.req_format4.checked) document.select_form.req_format1.checked = true; } else if (document.select_form.req_type4.checked) { document.select_form.show_ID.disabled = true; document.select_form.req_format4.disabled = true; document.select_form.OBJ_ID.disabled = true; document.select_form.OBJ_name.disabled = true; document.select_form.dep_name.disabled = true; document.select_form.ros_text1.disabled = true; document.select_form.ros_text2.disabled = true; document.select_form.begin_date0.disabled = true; document.select_form.end_date.disabled = true; document.select_form.block_name.disabled = true; document.select_form.size_min.disabled = true; document.select_form.size_max.disabled = true; document.select_form.room_type.disabled = true; document.select_form.show_empty.disabled = true; document.select_form.all_stream_components.disabled = true; document.select_form.lesson.disabled = true; document.select_form.begin_date1.disabled = true; if (document.select_form.req_format4.checked) document.select_form.req_format1.checked = true; } else { document.select_form.show_ID.disabled = true; document.select_form.req_format4.disabled = false; document.select_form.OBJ_ID.disabled = false; document.select_form.OBJ_name.disabled = false; document.select_form.dep_name.disabled = false; document.select_form.ros_text1.disabled = false; document.select_form.ros_text2.disabled = false; document.select_form.begin_date0.disabled = false; document.select_form.end_date.disabled = false; document.select_form.show_empty.disabled = false; if (document.select_form.ros_text2.checked) document.select_form.all_stream_components.disabled = false; else { document.select_form.all_stream_components.checked = false; document.select_form.all_stream_components.disabled = true; } document.select_form.block_name.disabled = true; document.select_form.size_min.disabled = true; document.select_form.size_max.disabled = true; document.select_form.room_type.disabled = true; document.select_form.lesson.disabled = true; document.select_form.begin_date1.disabled = true; } if (document.select_form.req_format4.checked) document.select_form.coding_mode2.checked = true; }
            </script>
        </form>
    </body>
</body>
`;
