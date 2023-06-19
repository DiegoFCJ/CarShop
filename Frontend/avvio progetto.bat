@echo off

echo Avvio MySQL Server...
start cmd /k "cd C:\Program Files\MySQL\MySQL Server 8.0\bin && mysql.exe -u root -p && mysql -u root -p<root>"

echo Avvio MySQLWorkbench...
start "" "C:\Program Files\MySQL\MySQL Workbench 8.0 CE\MySQLWorkbench.exe"

echo Avvio il server Spring Boot...
start cmd /k "cd /d C:\REPO\spring\CarShop\ && mvnw spring-boot:run"

echo Avvio il server Angular...
start cmd /k "cd /d C:\REPO\angular\CarShop && code . && ng s"

echo Avvio il progetto su edge...
timeout /t 30 /nobreak && start microsoft-edge:http://localhost:4200/user

