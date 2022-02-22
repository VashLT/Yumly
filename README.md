# Yumly: Create Uber Menus

Repositorio: https://github.com/VashLT/Yumly

#### Desarrollado por:

-   [VashLT](https://www.github.com/VashLT)
-   [Gacrucis](https://www.github.com/Gacrucis)
-   [MrDahaniel](https://www.github.com/MrDahaniel)

## Diagrama de Clases

![](https://i.imgur.com/81XmEub.png)

## Diagrama de flujo

<img src="https://i.imgur.com/VNLsMvF.png" />

## Documentación API

### Platillos

#### Agregar platillos

##### Descripción

Permite agregar platillos creados por el usuario
**Endpoint:** `POST /api/dish`

##### Payload

```json
{
    name: string,
    description: string,
    // id of the author
    original_author: number | null,
    recipeSteps: string[],
    // ingredient_id, ingredient_amount
    ingredients: [number, number][],
    utensils: Utensils[],
    preparation_time: number,
    // votes, times_added, is_published, and is_created are managed from backend
    categories: number[]
}
```

#### Editar platillos

##### Descripción

Permite editar platillos creados por el usuario
**Endpoint:** `PUT /api/dish`

##### Payload

```json
{
    id: number,
    name: string,
    description: string,
    author: number | null,
    // ingredient_id, ingredient_amount
    ingredients: [number, number][],
    recipeSteps: string[],
    // list of ids
    utensils: number[],
    preparation_time: number,
    is_published: boolean,
    // votes, times_added and is_created are managed from backend
    // list of ids
    categories: number[]
}
```

### Eliminar platillos

#### Descripción

Permite eliminar platillos creados por el usuario
**Endpoint:** `DELETE /api/dish`

#### Payload

```json
{
    id: number,
}
```

### Menús

#### Agregar menús

##### Descripción

Permite agregar menús creados por el usuario
**Endpoint:** `POST /api/menu`

##### Payload

```json
{
    name: string,
    description: string,
    // dish_id
    dish_list: number[],
    original_author: number[],
    // votes, creation_date are managed from backend
    categories: number[]
}
```

#### Editar menús

##### Descripción

Permite editar menús creados por el usuario
**Endpoint:** `PUT /api/menu`

##### Payload

```json
{
    name: string,
    description: string,
    // dish_id
    dish_list: number[],
    author: number[],
    // votes, creation_date are managed from backend
    categories: number[]
}
```

#### Eliminar menús

##### Descripción

Permite eliminar menús creados por el usuario
**Endpoint:** `DELETE /api/menu`

##### Payload

```json
{
    id: number,
}
```

### Búsqueda

#### Búsqueda de ingredientes

Permite buscar ingredientes a partir de los siguientes criterios:

-   nombre
-   categoria

**Endpoint:** `GET /api/ingredients?name=...&category=...`

#### Búsqueda de menús

Permite buscar menús a partir de los siguientes criterios:

-   nombre
-   categoria
-   platillos

**Endpoint:** `GET /api/menu?name=...&category=...&dish=...`

#### Búsqueda de platillos

Permite buscar platillos a partir de los siguientes criterios:

-   nombre
-   categoria
-   utensilio
-   ingredientes

**Endpoint:** `GET /api/menu?name=...&category=...&utensils=...&ingredients=...`

### Autenticación

#### Logear usuario (WIP)

Inicia la sesión de un usuario
**Endpoint:** `GET /api/login`

#### Deslogear usuario

Permite cerrar la sesión un usuario
**Endpoint:** `GET /api/logout`
