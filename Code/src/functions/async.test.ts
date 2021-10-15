import API from "./async";

describe( 'API test', () => {

    test( 'expect api call to return countries data', async () => {
        let result: any;

        await API.GET( "https://restcountries.com/v3.1/all" )
        .then( ( res ) => result = res );

        expect( result.length ).toBeGreaterThan(0);
        expect( Array.isArray( result ) ).toBeTruthy;
        expect( typeof result[0] === 'object' ).toBeTruthy;
    });

    test( 'expect api call to return single country', async () => {
        let result: any;
        const countryName: string = "Poland";

        await API.GET( `https://restcountries.com/v3.1/name/${countryName}` )
        .then( ( res ) => result = res );

        expect( result.length ).toBeGreaterThan( 0 );
        expect( result[0].name?.common ).toBe( countryName );
    });
})

export {};