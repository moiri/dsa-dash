import { Injectable } from '@angular/core';
import { TocService } from './toc/toc.service';
import * as $ from 'jquery';

@Injectable()
export class ParserService {
    private readonly _pattern: { [ patttern_str: string ]: RegExp } = {};

    private readonly _math: { [ math_str: string ]: string } = {};

    private _fig_folder: string;
    set fig_folder( name: string ) {
        this._fig_folder = name;
        this._fig_path = this._fig_folder + '/';
    }

    private _fig_path: string;
    get fig_path(): string {
        return this._fig_path;
    }

    constructor( private index: TocService ) {
        this._pattern['chapter'] = /\\chapter\{([^}]+)\}/;
        this._pattern['section'] = /\\section\{([^}]+)\}/;
        this._pattern['input'] = /\\input\{([^}]+)\}/;
        this._pattern['ignores'] = /(\\label\{([^}]+)\}|\\hfill \\\\|%.*)/;
        this._pattern['desc_begin'] = /\\begin\{description}/;
        this._pattern['desc_end'] = /\\end\{description}/;
        this._pattern['desc_elem'] = /\\item[\s]?\[([^}]+)\]/;
        this._pattern['item_begin'] = /\\begin\{itemize}/;
        this._pattern['item_end'] = /\\end\{itemize}/;
        this._pattern['item_elem'] = /\\item/;
        this._pattern['fig_begin'] = /\\begin\{figure}/;
        this._pattern['fig_end'] = /\\end\{figure}/;
        this._pattern['nameref'] = /\\(name|)ref\{([^}]+)\}/g;
        this._pattern['style_link'] = /\\textStyle(M|SF)\{([^}]+)\}/g;
        this._pattern['style_emph'] = /\\textStyle(VT|AT|Ta)\{([^}]+)\}/g;
        this._pattern['style_bold'] = /\\textStyleStrongEmphasis\{([^}]+)\}/g;
        this._pattern['math'] = /\\textrm\{[\s]?\$\{(.*?)\}\$[\s]?\}/g;
        this._pattern['nL'] = /\\newline/g;
        this._math['\\leq'] = ' &le; ';
        this._math['\\geq'] = ' &ge; ';
        this._fig_folder = 'fig';
    }

    private appendDocText( dest: JQuery, line: string ): JQuery {
        if( dest.hasClass( 'cont-text' ) )
            return dest.append( ' ' + line );
        else
            return this.createDocText( line ).appendTo( dest );
    }

    private createDocText( line: string ): JQuery {
        return $( '<p class="doc-text cont-text">' + line + '</p>' );
    }

    private getBaseDest( dest: JQuery ): JQuery {
        return dest.closest( '.cont-root' );
    }

    private getRootDest( dest: JQuery ): JQuery {
        return dest.closest( '.cont-root-0' );
    }

    private getListDest( dest: JQuery ): JQuery {
        return dest.closest( '.cont-list' );
    }

    public appendDocLine( line: string, dest: JQuery ): JQuery {
        var matches = null;
        var listElem = null;
        if( line == "" ) {
            dest = this.getBaseDest( dest );
            dest = this.createDocText( line ).appendTo( dest );
        }
        else if( ( matches = this._pattern['chapter'].exec( line ) ) != null ) {
            dest = this.getRootDest( dest );
            dest.append( '<h2>' + matches[1] + '</h2>' );
        }
        else if( ( matches = this._pattern['section'].exec( line ) ) != null ) {
            dest = this.getRootDest( dest );
            dest.append( '<h3>' + matches[1]
                + ' <small class="sect-subtitle"></small></h3>' );
        }
        else if( ( matches = this._pattern['input'].exec( line ) ) != null ) {
            var ids = matches[1].split( '/' );
            var list = $( this.getListDest( dest ) );
            if( list.length == 0 )
                dest = $( '<ul class="list-unstyled cont-list"></ul>' )
                    .appendTo( dest );
            else
                dest = list;
            dest.append( '<li class="list-bullet-text"><a href=# id="link-'
                + ids[0] + '-' + ids[1] + '">'
                + this.index.getTitle( ids[0], ids[1] ) + '</a></li>');
        }
        else if( ( matches = this._pattern['desc_begin'].exec( line ) ) != null ) {
            dest = this.getBaseDest( dest );
            dest = $( '<dl class="dl-horizontal cont-list"></dl>' )
                .appendTo( dest );
        }
        else if( ( matches = this._pattern['desc_elem'].exec( line ) ) != null ) {
            dest = this.getListDest( dest );
            dest.append('<dt>' + matches[1] + '</dt>' );
            dest = $( '<dd class="list-desc-text cont-root"></dd>' )
                .appendTo( dest );
            line = line.replace( this._pattern['desc_elem'], "" );
            dest = this.createDocText( line ).appendTo( dest );
        }
        else if( ( matches = this._pattern['desc_end'].exec( line ) ) != null ) {
            dest = this.getListDest( dest );
            dest = this.getBaseDest( dest );
        }
        else if( ( matches = this._pattern['item_begin'].exec( line ) ) != null ) {
            dest = this.getBaseDest( dest );
            dest = $( '<ul class="list-bullet cont-list"></ul>' )
                .appendTo( dest );
        }
        else if( ( matches = this._pattern['item_elem'].exec( line ) ) != null ) {
            dest = this.getListDest( dest );
            dest = $( '<li class="list-bullet-text cont-root"></li>' )
                .appendTo( dest );
            line = line.replace( this._pattern['item_elem'], "" );
            dest = this.createDocText( line ).appendTo( dest );
        }
        else if( ( matches = this._pattern['item_end'].exec( line ) ) != null ) {
            dest = this.getListDest( dest );
            dest = this.getBaseDest( dest );
        }
        else if( ( matches = this._pattern['fig_begin'].exec( line ) ) != null ) {
            dest = $( '<div class="hidden cont-list"></div>' ).appendTo( dest );
        }
        else if( ( matches = this._pattern['fig_end'].exec( line ) ) != null ) {
            dest = this.getListDest( dest );
            dest = this.getBaseDest( dest );
        }
        else {
            dest = this.appendDocText( dest, line );
        }
        return dest;
    };

    public removeIgnores( line: string ): string {
        var matches = null;
        if( ( matches = this._pattern['ignores'].exec( line ) ) != null )
            line = line.replace( this._pattern['ignores'], "" );
        return line;
    };

    public replaceMath( line: string ): string {
        var matches = null;
        if( ( matches = this._pattern['math'].exec( line ) ) != null ) {
            line = line.replace( this._pattern['math'], this._math[ matches[1].trim() ] );
        }
        return line;
    };

    public replaceNameref( line: string ): string {
        var matches = null;
        if( ( matches = this._pattern['nameref'].exec( line ) ) != null )
            line = line.replace( this._pattern['nameref'], function( regExStr, type, name ) {
                var title = '';
                var href = '#';
                var names = name.split( '.' );
                var id = 'link-' + names[0] + '-' + names[1];
                if( names[0] == this._fig_folder ) {
                    title = '<span class="glyphicon glyphicon-download-alt"></span>';
                    id = '';
                    href = this.fig_path + names[1] + ".pdf";
                }
                else
                    title = this.index.getTitle( names[0], names[1] );
                return '<a href="' + href + '" id="' + id + '">' + title + '</a>';
            } );
        return line;
    };

    public replaceNL( line: string ): string {
        var matches = null;
        if( ( matches = this._pattern['nL'].exec( line ) ) != null ) {
            line = line.replace( this._pattern['nL'], "\n\n" );
        }
        return line;
    };

    public replaceStyles( line: string ): string {
        var matches = null;
        if( ( matches = this._pattern['style_emph'].exec( line ) ) != null )
            line = line.replace( this._pattern['style_emph'],
                function( regExStr, type, name ) {
                return '<span class="span-' + type + '">' + name
                    + '</span>';
            } );
        if( ( matches = this._pattern['style_link'].exec( line ) ) != null )
            line = line.replace( this._pattern['style_link'],
                function( regExStr, type, name ) {
                    return name;
            } );
        if( ( matches = this._pattern['style_bold'].exec( line ) ) != null )
            line = line.replace( this._pattern['style_bold'],
                function( regExStr, name ) {
                    return '<strong>' + name + '</strong>';
            } );
        return line;
    };
}
