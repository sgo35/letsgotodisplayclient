export class SearchParam {
    // Filtre de recherche globale
    _global: string;
    // Liste des colonnes sur lesquelles effecuter la recherche globale
    _col: Array<string>;
    // Numero de la page dans la pagination
    _pageNumber: number;
    // Taille de la page dans la pagination
    _pageSize: number;
    // Nom du champ pour le tri
    _sortBy: string;
    // Permert de recuperer des donnees complementaires
    _embedded: Array<string>;
    filters: Array<any>;

    constructor(searchParam: Partial<SearchParam>) {
        Object.assign(this, searchParam);
    }

}
