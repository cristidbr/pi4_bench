'use strict';

const { execSync } = require( 'child_process' );
const puppeteer = require( 'puppeteer' );
const argv = require( 'minimist' )( process.argv.slice( 2 ) );
const fs = require( 'fs' );

// task to benchmark
const bench_task = ( async ( ) => 
{   
    var tstart = process.hrtime();
    const browser = await puppeteer.launch({ headless: false, executablePath: '/var/bench/chromium-browser/chromium-browser-v7' });
    var tlaunch = process.hrtime( tstart );
    const page = await browser.newPage();
    
    await page.goto( 'file:///home/cristidbr/Desktop/pi4_bench/benchmark.htm' );
    await page.evaluate( () => 
    {
        parseInt( !! window.hasOwnProperty( 'benchReady' ) )         
    }); 

    var tend = process.hrtime( tstart );
    await browser.close();
    
    // clear cached memory
    execSync( 'sync ; echo 3 | sudo tee /proc/sys/vm/drop_caches' );

    return [ tlaunch, tend ];
});

// tasks runner
( async ( ) => 
{
    const bench_runs = argv.runs || 1;
    var mapTimestamp = ( d ) => { return parseFloat( `${ d[0] }.${ d[1] }` ); };
    var results = [];

    for( var i = 0; i < bench_runs; i++ )
    {
        let result = await bench_task();
        results.push( result.map( mapTimestamp ) );
    } 
    
    var bench_data = JSON.stringify( { 
        launch: results 
    });

    fs.writeFile( 'bench.json', bench_data, ( err ) => 
    {
        if( err ) throw err;
        console.log( 'Benchmark ended' );
    });
})();
