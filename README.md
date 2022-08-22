# Sky Wallet (mobile)

## Instalación

- 1 - Bajar o clonar el repositorio
	- > git clone https://github.com/Diego-Guarise/Sky-Wallet.git
	
 - 2 - En la carpeta principal corremos `npm install` para instalar las dependencias
 - 3 - Luego iniciamos el proyecto con `npm start`
 - 4 - Descargamos la app "Expo Go"
 - 5 - Abrimos la camara y escaneamos el codigo QR

## Objetivo Realizados


Wallet (billetera) non-custodial mobile para criptomonedas. La misma cumple con las siguientes funcionalidades:

	● Creación de una nueva wallet

	● Respaldo de clave privada

	● Importación de clave privada

	● Firma y envío de transacciones

	● Visualización de historial de transacciones y de balance

### También se tuvieron en cuenta los siguientes puntos

	● Se desea una solución que priorice la descentralización

	● La seguridad es un factor importante en la solución a diseñar

	● La empresa que diseña la solución no debe tener acceso nunca a las claves privadas de sus usuarios

	● Debe soportar cualquier red compatible con EVM (Ethereum Virtual Machine)

#### Tiempo de desarrollo: 59 hs

## Tools

Para el desarrollo de la aplicación se utilizaron las siguientes tecnologías:
 * React Native
* Redux
* NodeJS
* Ethers
* Expo

Redux, NodeJS y React fueron solicitadas por el cliente prefiriendo el uso de dichas tecnologias.
Al ser una aplicación mobile se decidió utilizar React Native junto a Expo para tener un mejor entorno de desarrollo y facilitar el proceso de debug. Ethers se utilizo para interactuar con la EVM.

## Pages

### La wallet se compone de 3 pantallas:

### Home page
![Page Home](https://github.com/Diego-Guarise/Icons-and-logos/blob/master/0296d7a8-6590-4222-a9bc-cf323534f14c.jpg?raw=true)
### Create wallet page
![Create Wallet](https://raw.githubusercontent.com/Diego-Guarise/Icons-and-logos/master/25b61eab-2790-4bf7-aea8-1d9b946806ef.jpg)
### Wallet page
![Wallet page](https://github.com/Diego-Guarise/Icons-and-logos/blob/master/7a56d6a0-9e13-4d28-847d-6bc4a01c0d8c.jpg?raw=true)

### -Home
En la pagina home nos encontramos con 2 posibilidades
	- 1 Importar una wallet
	- 2 Crear una wallet
#### Importar wallet
Para importar una wallet deberemos ingresar nuestra frase semilla (mnemonica) y crear una contraseña al hacer esto y apretar el botón "Import Wallet" correrá la función anónima almacenada en `checkData` que como describe su nombre checkea la información brindada por el usuario para que cumpla con los requerimientos necesarios, luego de la verificación se llama a la función `importWallet(_seed, _password1)` la cual tomara la frase semilla brindada por el usuario y la contraseña creada. Dentro de dicha función se utiliza `ethers.Wallet.fromMnemonic(mnemonic)` con al frase mnemonica para obtener la billetera en caso de que la frase sea correcta.

Luego se despacha la address de la wallet en la store redux y el estado del login. Con la contraseña brindada por el usuario y la función `wallet.encrypt(password)` se encripta la wallet y luego almacena la wallet utilizando `SecureStore.setItemAsync(key, WalletJson)` la cual guarda la wallet con la key que se le brinda.
SecureStore proporciona una forma de cifrar y almacenar de forma segura pares clave-valor localmente en el dispositivo Cada proyecto de Expo tiene un sistema de almacenamiento separado y no tiene acceso al almacenamiento de otros proyectos de Expo.
Luego de todo eso vamos a la Wallet page.

#### Crear una wallet
Pasa a la siguiente vista "Create Wallet".

### -Create wallet
En esta pantalla nos encontramos con un componente llamado "create-wallet-component". Luego crear una contraseña y apretar en "Create wallet" se llamara a la función anónima dentro de la constante `checkData` esta función como describe el nombre checkea la password a través de `passwordIsCorrect()` luego de pasar los requisito para crear una clave se llama a la función `createWallet(_password1)` que crea una wallet con la función `ethers.Wallet.createRandom()`, luego es encriptada por la función `wallet.encrypt(password)` y la contraseña brindada por el usuario.
La wallet es guardada de la misma manera descrita en "Importar wallet" con SecureStore.

Luego al salir de la función `createWallet()` se despacha información a la store redux para confirmar que el usuario creo una contraseña y se genero una frase mnemonica. Con la wallet ya creada se procede con desencriptar la wallet con la función `decrypt(_password1)` que usa la contraseña del usuario para desencriptarla y devolver la wallet, donde el componente se encarga de despachar la address de la wallet creada y mostrar en pantalla la frase mnemonica. 
Volviendo a la vista, la vista checkea en la store redux si hay un booleano `true` en "SET_SEED" que indica que efectivamente existe una seed, por lo tanto la wallet fue creada con éxito. Luego esta vista lleva a la Wallet page.

### -Home wallet
En esta vista Home nos encontramos con distintas funcionalidades:	
- Address
- Balance
- Import
- Key
- Seed
- Transaction
- History
- Log out

#### Address:
En la parte superior nos encontramos con la Address de la wallet que se inicio sesión en la aplicación.
#### Balance:
Nos brinda el balance de la wallet, esto lo hace utilizando la función `getBalance` a que utiliza `provider.getBalance(address)` esta función recibe el provider y la address para conectarse y devolver una promesa que luego es awaiteada y retornada en formato eth.
#### import:
Esta funcionalidad nos permite crear una nueva instancia de wallet para la clave privada, para esto se utiliza la función `importPk(password, pk)` esta función recibe la password para y la clave privada, la clave privada es utilizada para crear la nueva instancia de wallet `new  ethers.Wallet(pk)`. Luego se guarda en redux junto con la address de la wallet actual, la nueva wallet.

#### Seed:
Apretando en el botón "Seed" podremos ver nuestra frase mnemonica, para esto deberemos introducir nuestra contraseña en un PopUp que se desplegara, al introducir la contraseña y aceptar el PopUp, se correrá una función anónima igualada a la constante `seedFunction`  esta función traerá su wallet almacenada por fuera de la app en su dispositivo y la desencriptara  utilizando la función `decrypt(_password)` con su contraseña para mostrarle su frase mnemonica
#### Key:
El botón Key correrá la función anónima contenida por `keyFunction` es para poder ver nuestra clave privada generada a través de un hash de nuestra seed, para obtener la clave privada deberemos introducir nuestra contraseña. el proceso es similar al botón de Seed descrito mas arriba con la diferencia que en vez de mostrarnos la seed nos muestra la clave privada
#### Transaction:
Esta instancia es para hacer una transacción de una wallet a otra para esto se nos levantara un PopUp en el cual deberemos poner 
		-> El monto a transferir
		-> La address del destinatario
		-> Y la clave privada
	Esta funcion anonima contenida por la constante `transferFunction` utiliza la funcion 
	`transaction( _pk, provider, _to, _ammount)` la cual toma la clave privada puesta por el usuario el provider, el destinatario y el monto, esta funcion crea un instancia de wallet con la clave privada y la conecta con el provider para luego utilizar el método `sendTransaction()` al cual se le proporciona el destinatario y el valor.
#### History:
La funcionalidad History utiliza la función anónima almacenada en la constante `historyFunction` y busca la address actual y llama a la función `history(address, network)` la cual se le pasa el argumento address y network para a través de `ethers.providers.EtherscanProvider(network)` devolver el provider para utilizar el método `getHistory(address)` con la dirección de la wallet. Luego la función `history(address, network)`retorna el objeto para ser recorrido con el motivo de extraer el destinatario, la address de origen y el valor, estos valores son agregados a una variable para mostrarse en el PopUp de History que se abre al apretar dicho botón.

 #### Log Out:
 Al hacer "Tap" en el botón log out nos saldrá un PopUp para confirmar que quieres salir de nuestra wallet. Al hacer esto la información sensible como la wallet guardada en el dispositivo y el historial de las transacciones son eliminados del dispositivo, al mismo tiempo en la store de redux se cambia el estado de la aplicación marcando el log out e eliminando la información.
 Esto nos llevara a la Home Page.

## Navigation
Para la navegación nos encontramos con 2 formas de navegación distintas, una habilitada por default y otra pensada para el desarrollo de las vistas (pages);

			- app-bar
			- main-stack
#### app-bar
Esta forma de navegación viene deshabilitada por default pudiendo habilitarse para el desarrollo de las vistas desde el archivo `App.js`. Esta es una forma de navegación a través de una barra en la parte superior de la pantalla fue pensada para desarrollar el estilo de las vistas de una forma mas dinámica debido a que nos permite movernos entre las vistas de manera independiente, es importante aclarar que al movernos de esta manera podríamos no estar siguiendo el flujo de la aplicación para su correcto funcionamiento.
#### main-stack
Esta forma de navegación viene activada por defecto y acompaña el flujo de la aplicación, para esto se utilizo `createNativeStackNavigator` y `NavigationContainer` esta forma de navegación funciona como una pila poniendo una pantalla encima de otra, se utilizo este sistema de navegación debido a que tiene comporta exactamente igual y tiene las mismas características de rendimiento que las aplicaciones creadas de forma nativa.

## Estilos
Para los estilo se intento aislar los estilos de las pages y los componentes para tenerlo todo aislado en un archivo llamado `theme.js` que contiene una constante llamada `theme`, esta misma es contiene un diccionario con la "key" correspondiente a un estilo y el "value" como un conjunto de propiedades para ese estilo. De esta manera se intento reducir la aparición de propiedades de estilos en las vistas y componentes.
Por otro lado tenemos el archivo `styled-text.jsx` que brinda estilo de manera similar a la "app-bar".

## Infraestructura
![Infraestructura](https://github.com/Diego-Guarise/Icons-and-logos/blob/master/infraestructura.png?raw=true)

## Documentación
React Native: 

 -  https://www.youtube.com/watch?v=qi87b6VcIHY
-  https://reactnative.dev

Redux:
 - https://redux.js.org/introduction/getting-started

Ethers:
- https://jetsoanalin.github.io/EthersJsTutorialJetso/
- https://docs.ethers.io/v5/
