@echo off
echo Instalando dependências...
call npm install

echo Gerando build da aplicação...
call npm run build

echo Iniciando servidor local
call npm run start

pause