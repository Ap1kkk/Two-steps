// src/types/index.ts - ДОЛЖЕН экспортировать что-то
export interface User {
    id: number
    name: string
    email: string
}

export interface Route {
    id: number
    title: string
    distance: number
}

// НЕ используйте export default если вы импортируете отдельные сущности