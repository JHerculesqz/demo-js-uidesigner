echo off

echo STEP1.xcopy 1.platform/static
xcopy %~dp0..\..\demo-js-vue\1.platform\static %~dp0..\silver_surfer\static\ /s /y

echo STEP2.xcopy 1.platform/walle
xcopy %~dp0..\..\demo-js-vue\1.platform\src\walle %~dp0..\silver_surfer\src\walle\ /s /y

pause>null