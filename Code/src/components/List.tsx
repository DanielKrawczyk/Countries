import { useState } from "react";
import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import ListItem from "./List_Item";
import Search from './Search';
import Loading from "./Loading";
import API from '../functions/async';
import Message from "./Message";

let pages: any = [];
let item: number = 0;
let IsLoaded: boolean = false;
let fullData: any = [];

export default function List() {

    const [ data, setData ] = useState( [ [] ] ),
        [ message, setMessage ] = useState( "So empty here... I think I can't find what you are looking for :/" ),
        history = useHistory();


	function CallAPI( url: string ): void {
		API.GET( url )
		.then( ( res ) => {
            fullData = res;
			IsLoaded = true;
            CreatePages( fullData );
		})
		.catch( () => {
            IsLoaded = true;
            fullData.push("NO_DATA");
            setMessage( "Ooops! Something is wrong! Try again later :(" );
		});
	}

    function CreatePages( array: any ): void {
        let page = [];
        let limit = item + 10;

        for ( let i = item; i < limit; i++ ) {
            item++;
            if ( i >= array.length ) break;

            page.push(
                <ListItem key={ Math.random() } data={ array[i] } />
            );
        }

        if ( page.length !== 0 )
            pages.push( page );

        if ( item >= array.length ) return DoneLoading();
            CreatePages( array );
    }

    function SearchBy( query: string ): void {
        pages = [];
        item = 0;

        const filter = fullData.filter( ( item: any ) => 
            item.region?.toLowerCase().includes( query.toLowerCase() ) || 
            item.name?.official.toLowerCase().includes( query.toLowerCase() ) || 
            item.name?.common.toLowerCase().includes( query.toLowerCase() ) );

        CreatePages( filter );
    }

    const DoneLoading = () => { setData( pages ); history.push( "/" ) };



    if ( IsLoaded === false )
        CallAPI( "https://restcountries.com/v3.1/all" );
    


    if ( fullData.length === 0 && IsLoaded === false ) {
        return (
            <Loading />
        )
    }
    else if ( ( fullData.length > 0 && pages.length === 0 ) || fullData[0] === "NO_DATA" ) {
        return (
            <React.Fragment>
                <Search onSearch={ ( query: string ) => SearchBy( query ) } />
                <Message message={message} />
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <Search onSearch={ ( query: string ) => SearchBy( query ) } />
                <div className="list">
                    <Switch>
                        { data.map( ( item: any, index: number ) => {
                            return (
                                ( index === 0 ) ?
                                <Route key={ Math.random() } exact path="/">
                                    { item.map( ( elem: any ) => {
                                        return (
                                            elem
                                        )
                                    } ) }
                                </Route>
                            :
                                <Route key={ Math.random() } path={ `/page=${ index + 1 }` }>
                                    { item.map( ( elem: any ) => {
                                        return (
                                            elem
                                        )
                                    } ) }
                                </Route>
    
                            )
                        } ) }
                    </Switch>
                    <div className="list-pages">
                        {data.map( ( item: any, index: number ) => {
                            return (
                                <span key={ Math.random() } className="list-pages_link">
                                    { index === 0 ? 
                                        <Link className="active" to="/" onClick={ ( e ) => {
                                            document.querySelectorAll( '.active' ).forEach( ( item: any ) => item.classList.remove( 'active' ) );
                                            e.currentTarget.classList.add( 'active' );
                                        } }>
                                            { index + 1 }
                                        </Link>
                                    :
                                        <Link to={ `/page=${ index + 1 }` } onClick={ ( e ) => {
                                            document.querySelectorAll( '.active' ).forEach( ( item: any ) => item.classList.remove( 'active' ));
                                            e.currentTarget.classList.add( 'active' );
                                        }}>
                                            { index + 1 }
                                        </Link>
                                    }
                                </span>
                            )
                        } ) }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}