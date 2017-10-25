import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TocService {
    private items$;
    private readonly path = '../../assets/doc_toc.json';

    constructor( private http: Http ) {
        this.items$ = this.http.get( this.path );
    }

    public getTitle( folder: string, file: string ): string {
        let title = "";
        this.items$.subscribe( items => {
            for( let item of items.json() ) {
                if( ( item.file == file ) && ( item.folder == folder ) ) {
                    title = item.name;
                    break;
                }
            }
        });
        return title;
    };

    public getList( folder: string ): TocItem[] {
        let list = [];
        this.items$.subscribe( items => {
            for( let item of items.json() ) {
                if( item.folder == folder ) {
                    list.push( item );
                }
            }
        });
        return list;
    };
}

export interface TocItem {
    folder: string;
    file: string;
    name: string;
}
