console-weather
===============

A console client for getting the current weather forecast.

In order to use console-weather, you need to get a Weather Underground API key
from http://api.wunderground.com/weather/api/ and set your WEATHER_API
environment variable to it.

## Installation

    npm install -g console-weather


## Usage

    weather [-f]

    -f: Show 4 day forecast.

### Output

    --------------------------------------------------------------------------------
    
                        Central Square, Cambridge, Massachusetts                    
    
                           Scattered Clouds :: 60.9 F (16.1 C)                      
    
                       Thu          Fri          Sat          Sun                   
                     65 / 50      66 / 64      68 / 48      61 / 48                 
    
                         Last Updated on October 18, 5:00 PM EDT                    
    
    --------------------------------------------------------------------------------


## License

console-weather is available under a BSD 2-clause license. See LICENSE for details.