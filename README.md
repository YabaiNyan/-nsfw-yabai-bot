Yabai-Chan is a gelbooru discord bot!

Commands
=====

* ```>h <tags>```: Find a random image from gelbooru. Tags are optional.<br>
* ```>hloop <tags> <time between loops>```: Periodicly returns images from gelbooru until stopped. Only one loop can run at a time. If a new loop while another is running, the running loop will be updated with the new loop. Tags and timer are optional.<br>
* ```>hloop stop```: Stops the hloop.
* ```>purge <number of messages>```: Deletes up to 100 of the most recent messages.

Installation
=====

1) Clone this repository
2) Replace ```<-- Enter Your Bot Token Here! -->``` in yabai-chan.js with a bot token generated on discord developer website.
3) Open a console in the yabai-chan folder and run ```npm install```
4) To start, run ```node yabai-chan.js``` or ```npm test```