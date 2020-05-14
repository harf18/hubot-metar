# Hubot script to get METAR and TAF

Hubot give you Weather report in you chat service when you speak to your pilot friends.

```
Have you seen the metar of KSFO ?
=> KSFO 140856Z 25005KT 10SM FEW010 SCT140 BKN200 13/11 A3008 RMK AO2 SLP186 T01330106 58002
```

Hubot detects the words "metar" or/and "taf" and makes a request for all 4 letter words that follow them.

In case of error, nothing is returned so as not to disturb human conversation.

Use the API of **checkwx.com**. You need a key and enter it in the environment variable **METAR_API_KEY**.
