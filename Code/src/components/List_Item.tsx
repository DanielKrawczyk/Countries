export default function ListItem( args: any ) {

    const { name, currencies, languages, region, flags, subregion, area, capital } = args.data;

    const nativeNames = ( name.nativeName === undefined ) ? [ "None" ] : Object.values( name.nativeName ).map( ( item: any ) => {
        return `${ item.official } ( ${ item.common } )`
    }),
    currency = ( currencies === undefined ) ? [ "None" ] :  Object.values( currencies ).map( ( item: any ) => {
        return `${ item.symbol } ${ item.name }`
    });

    function ItemClicked( elem: any ): void {

        for ( let i = 0; i < elem.length; i++ ) {

            if ( elem[i].classList.contains( "--show" ) )

                elem[i].classList.remove( "--show" );

            else 
                elem[i].classList.add( "--show" );
        }
    }

    return (
        <div className="list_item" onClick={ ( e ) => ItemClicked( e.currentTarget.children ) }>
            <div className="list_item_top">
                <div className="list_item_top_flag">
                    <img src={ flags.png } alt={`Flag of ${ name.common }`} />
                    <p>
                        ( Click to show more )
                    </p>
                </div>
                <div className="list_item_top_name">
                    <div className="list_item_top_name_region">
                        <span>
                            { region } / { subregion }
                        </span>
                    </div>
                    <div className="list_item_top_name_names">
                        <div className="list_item_top_name_names_official">
                            { name.official }
                        </div>
                        <div className="list_item_top_name_names_common">
                            { name.common }
                        </div>
                        <div className="list_item_top_name_names_native">
                            { ( name.nativeName === undefined ) ? "None" : nativeNames.join( ", " )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="list_item_more">
                <div className="list_item_more_info">
                    <span className="list_item_more_info_title">
                        Currencies:&emsp;
                    </span>
                    <span className="list_item_more_info_text">
                        { ( currencies === undefined ) ? "None" : currency.join( ", " )}
                    </span>
                </div>
                <div className="list_item_more_info">
                    <span className="list_item_more_info_title">
                        Languages:&emsp;
                    </span>
                    <span className="list_item_more_info_text">
                        { ( languages === undefined ) ? "Unkown" : Object.values( languages ).join( ", " )}
                    </span>
                </div>
                <div className="list_item_more_info">
                    <span className="list_item_more_info_title">
                        Area:&emsp;
                    </span>
                    <span className="list_item_more_info_text">
                        { area } km<sup>2</sup>
                    </span>
                </div>
                <div className="list_item_more_info">
                    <span className="list_item_more_info_title">
                        Capital/s:&emsp;
                    </span>
                    <span className="list_item_more_info_text">
                        { ( capital === undefined ) ? "None" : capital.map( ( item: any ) => {
                            return (
                                item + " "
                            )
                        })}
                    </span>
                </div>
            </div>
        </div>
    )
}