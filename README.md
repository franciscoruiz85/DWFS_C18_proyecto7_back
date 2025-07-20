# DWFS_C18_proyecto7_back - API REST con Node.js, Express, MongoDB y Stripe

Este proyecto es una API RESTful desarrollada como parte del curso de Desarrollo Web Full Stack (DWFS), Cohort 18 de UDD. Proporciona endpoints para gestionar usuarios y productos, y con autenticación mediante JWT.

El proyecto está enfocado en una cervecería, los usuarios que les compran y los variados productos que ellos venden.


## 📦 Tecnologías y dependencias
- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework minimalista y flexible para aplicaciones web que proporciona un conjunto robusto de características.
- **MongoDB**: Base de datos NoSQL orientada a documentos que ofrece alto rendimiento, alta disponibilidad y escalabilidad fácil. Almacena datos en documentos flexibles similares a JSON, lo que permite esquemas dinámicos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js que proporciona una solución basada en esquemas para modelar los datos de la aplicación.
- **bcryptjs**: Biblioteca para hashing de contraseñas, esencial para el almacenamiento seguro de credenciales.
- **jsonwebtoken (jwt)**: Estándar abierto para crear tokens de acceso que permiten la autenticación y autorización segura.
- **dotenv**: Módulo que carga variables de entorno desde un archivo .env a process.env.
- **cors**: Mecanismo que permite solicitar recursos restringidos en una página web desde un dominio diferente.
- **cookie-parser**: Middleware para Express que analiza las cookies adjuntas en las solicitudes HTTP, facilitando el manejo de datos de sesión o preferencias del usuario almacenadas en el cliente.
- **stripe**: Plataforma de pagos en línea que permite a las aplicaciones procesar transacciones, gestionar suscripciones y manejar operaciones financieras de forma segura mediante una API robusta y fácil de integrar.
- **nodemon** (dev): Herramienta esencial para desarrollo que monitorea cambios en los archivos y reinicia automáticamente el servidor Node.js, acelerando el ciclo de desarrollo al eliminar la necesidad de reinicios manuales constantes. Configurado en el script "dev" del package.json para un flujo de trabajo optimizado.


## 📁 Estructura del proyecto

<img width="187" height="550" alt="image" src="https://github.com/user-attachments/assets/7c5a998d-4582-42ed-925d-19274d751583" />


## 🗄️ Base de Datos – MongoDB
Este proyecto utiliza MongoDB como sistema de gestión de base de datos NoSQL, alojado en la nube mediante MongoDB Atlas.


## 🔌 Conexión
La conexión a la base de datos se realiza usando la librería mongoose, un ODM (Object Data Modeling) para Node.js que permite interactuar con MongoDB mediante esquemas definidos.

La URI de conexión está definida en el archivo .env:
MONGODB_URI=mongodb+srv://mongodb+srv://`usuario`:`contraseña`@`cluster`/`nombre_base_de_datos`

La función connectDB() ubicada en src/config/db.js se encarga de iniciar la conexión al momento de arrancar el servidor.


## 🔐 Autenticación
El middleware authorization.js protege rutas que requieren un token JWT válido en el header.

Este middleware se encarga de verificar que:
- El encabezado Authorization esté presente.
- El token sea válido y no haya expirado.
- Esto se gestiona a traves de la librería "cookie-parser".


## 🧩 Esquemas
## 🧑‍💻 Usuario (User)
Ubicado en src/models/user.model.js, este esquema define los datos de cada usuario:

| Campo      | Tipo                      | Requerido      | Descripción
| ---------- | ------------------------- | -------------- | -------------------------------------------------
| `username` | `String`                  | ✅            | Nombre de usuario
| `email`    | `String`                  | ✅ (único)    | Correo electrónico del usuario
| `password` | `String`                  | ✅            | Contraseña cifrada
| `address`  | `String`                  | ❌            | Dirección del usuario
| `phone`    | `Number`                  | ❌            | Número telefónico del usuario
| `role`     | `String` (`enum`)         | ❌            | Rol del usuario: `"Administrador"` o `"Usuario"`
| `cart`     | `mongoose.Types.ObjectId` | ❌            | Referencia al carrito de compras (`Cart`)

## 🍺 Producto (Product)
Ubicado en src/models/product.model.js, este esquema define los productos registrados:

| Campo         | Tipo     | Requerido              | Descripción                                        
| ------------- | -------- | ---------------------- | -------------------------------------------------------
| `idProd`      | `String` | ✅                      | ID del producto (interno o externo, como Stripe ID)
| `priceID`     | `String` | ✅                      | ID del precio asociado al producto
| `currency`    | `String` | ✅                      | Moneda utilizada ("CLP")
| `slug`        | `String` | ✅ (único)              | Identificador amigable para URLs
| `productname` | `String` | ✅                      | Nombre del producto
| `type`        | `String` | ✅                      | Tipo o categoría del producto (`Cerveza`, `Vaso`)
| `cc`          | `Number` | ❌                      | Contenido en cc (contenido o capacidad del producto)
| `price`       | `Number` | ✅                      | Precio del producto
| `description` | `String` | ✅                      | Descripción detallada del producto
| `image`       | `String` | ❌                      | URL de imagen del producto

## 🛒 Carrito (Cart)
Ubicado en src/models/cart.model.js, este esquema define el carro de compra de cada usuario registrado:

| Campo         | Tipo     | Requerido  | Descripción
| ------------- | -------- | ---------- | -------------------------------------------------------
| `priceID`     | `String` | ✅         | ID del precio (ej. relacionado con Stripe o producto)
| `productname` | `String` | ✅         | Nombre del producto
| `price`       | `Number` | ✅         | Precio unitario del producto
| `quantity`    | `Number` | ✅         | Cantidad agregada al carrito
| `image`       | `String` | ✅         | URL de la imagen del producto
| `slug`        | `String` | ✅         | Identificador del producto en URL (slug SEO-friendly)

**NOTA:** Los esquemas están configurados con timestamps: true, lo que permite que MongoDB registre automáticamente las fechas de creación y modificación (createdAt, updatedAt) de cada documento.


## Instalación
1. Clonar el repositorio: git clone `https://github.com/franciscoruiz85/DWFS_C18_proyecto7_back.git`
2. Instalar dependencias: npm install
3. Configurar variables de entorno:
    Crear un archivo .env en la raíz del proyecto con las siguientes variables:
    - MONGO_URI=mongodb+srv://`usuario`:`contraseña`@`cluster`/`nombre_base_de_datos`
    - URL=`http://localhost:3000`
    - PORT=`3000`
    - JWT_SECRET=`tu_secret_para_jwt`
    - NODE_ENV=`development`
    - FRONTEND_URL_DEV=`http://localhost:5173`
    - FRONTEND_URL_PROD=`https://hopyhour.netlify.app/`
    - STRIPE_KEY=`tu_key_para_stripe`
    - STRIPE_SUCCESS_URL=`http://localhost:5173/pago-exitoso`
    - STRIPE_CANCEL_URL=`http://localhost:5173/pago-cancelado`

    En el caso de producción se debe hacer los siguientes cambios al crear las variables en el despliegue:
    - NODE_ENV=`production`
    - STRIPE_SUCCESS_URL=`https://hopyhour.netlify.app/pago-exitoso`
    - STRIPE_CANCEL_URL=`https://hopyhour.netlify.app/pago-cancelado`


## Despliegue
El proyecto fue disponibilizado para su uso en línea a través de Render [dwfs-c18-proyecto7-back.onrender](https://dwfs-c18-proyecto7-back.onrender.com)


## Endpoints
## 🧑‍💼 Endpoints de Usuario (/api/users)
| Método | Ruta           | Descripción                                 | Autenticación
| ------ | -------------- | ------------------------------------------- | -------------
| POST   | `/create`      | Registrar un nuevo usuario                  | ❌
| POST   | `/login`       | Iniciar sesión y obtener token JWT          | ❌
| GET    | `/verify-user` | Verificar validez del token del usuario     | ✅
| GET    | `/`            | Obtener todos los usuarios                  | ✅
| PUT    | `/update`      | Actualizar datos del usuario autenticado    | ✅
| PUT    | `/admin-user`  | Modificar rol de un usuario a administrador | ✅
| DELETE | `/`            | Eliminar el usuario autenticado             | ✅
| POST   | `/logout`      | Cerrar sesión del usuario                   | ❌

## 🍺 Endpoints de Productos (/api/products)
| Método | Ruta      | Descripción                   | Autenticación
| ------ | --------- | ----------------------------- | -------------
| POST   | `/`       | Crear un nuevo producto       | ✅
| GET    | `/`       | Obtener todos los productos   | ❌
| GET    | `/:id`    | Obtener un producto por ID    | ✅
| PUT    | `/update` | Actualizar un producto por ID | ✅
| DELETE | `/`       | Eliminar un producto          | ✅

## 🛒 Endpoints de Carrito (/api/cart)
| Método | Ruta          | Descripción                           | Autenticación
| ------ | ------------- | ------------------------------------- | -------------
| GET    | `/get-cart`   | Obtener el carrito del usuario        | ✅
| PUT    | `/edit-cart`  | Editar (agregar/modificar) el carrito | ✅
| GET    | `/checkout`   | Obtener resumen del carrito para pago | ✅
| GET    | `/clear-cart` | Vaciar completamente el carrito       | ✅


## ✅ Conclusión
Este proyecto representa una implementación sólida de una API RESTful moderna, orientada al dominio de una cervecería digital, con soporte completo para la gestión de usuarios, productos, y carrito de compras.

A lo largo del desarrollo se aplicaron principios fundamentales del desarrollo web full stack, como la separación de responsabilidades, uso de middleware para autenticación con JWT, manejo de variables de entorno, y esquemas bien definidos con Mongoose.

Gracias al uso de tecnologías como Node.js, Express, MongoDB y Stripe, y su arquitectura modular la aplicación logra una estructura escalable, segura y preparada para adaptar fácilmente el proyecto a distintos contextos, como aplicaciones de e-commerce, sistemas de inventario o cualquier otro entorno donde se gestionen usuarios y productos.

En resumen, este proyecto es una base sólida para desarrollar aplicaciones web modernas que requieren una API segura, escalable, adaptable y eficiente.
