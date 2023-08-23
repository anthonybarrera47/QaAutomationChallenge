# Flujos de Pruebas Unitarias para el Componente App

## 1. Renderizado Inicial

- Descripción: Verificar que el componente se renderiza sin errores.
- Paso(s):
  - Renderizar el componente <App />.
- Resultado Esperado:
  - Se encuentra el encabezado "Get Github Repos" en la pantalla.

## 2. Búsqueda Exitosa y Visualización de Repositorios

- Descripción: Probar la búsqueda exitosa de repositorios y su visualización.
- Paso(s):
  - Simular una respuesta exitosa con repositorios mock.
  - Ingresar "testuser" en el campo de usuario de Github.
  - Hacer clic en el botón "Go".
- Resultado Esperado:
  - Se muestran enlaces para los nombres de los repositorios "Repo 1" y "Repo 2".

## 3. Mensaje de Error en Búsqueda Sin Repositorios

- Descripción: Verificar que se muestre el mensaje correcto cuando no se encuentran repositorios.
- Paso(s):
  - Simular una respuesta exitosa sin repositorios.
  - Ingresar "testuser" en el campo de usuario de Github.
  - Hacer clic en el botón "Go".
- Resultado Esperado:
  - Se muestra el mensaje "No repos found.".

## 4. Mensaje de Error en Fallo de Fetch

- Descripción: Probar que se muestre un mensaje de error genérico cuando falla la solicitud.
- Paso(s):
  - Simular un error en la solicitud.
  - Ingresar "testuser" en el campo de usuario de Github.
  - Hacer clic en el botón "Go".
- Resultado Esperado:
  - Se muestra el mensaje "Something went wrong.".