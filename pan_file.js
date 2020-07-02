import * as RNFS from 'react-native-fs';

export const requestExternalWrite = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Access to your files is needed to save the song",
        message:
          "In order to save the song write access to your files and documents is needed.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can write externally");
    } else {
      console.log("write permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


export function parse_song(str)
{
  let parts = str.split('##');
  let title = parts.splice(0,1)[0].substring(1);
  while (title[0] == ' ')
    title = title.substring(1);
  while(title.includes('\n'))
    title = title.replace('\n','');
  let passages = [];
  for(let i = 0; i < parts.length; i++)
  {
    let passage_parts = parts[i].split('\n');
    let passage_title = passage_parts.splice(0,1)[0];
    let instrument = '';
    let instruments = [];
    let lines = [];
    for(let j = 0; j < passage_parts.length; j++)
    {
      if (passage_parts[j].includes('###'))
      {// Start of a new  instrument.
        if (instrument != '')
        {
          instruments.push({instrument:instrument,lines:lines})
          lines = [];
        }
        instrument = passage_parts[j];
      }
      else if (passage_parts[j].includes('\t'))// line of music.
      {
        lines.push(line_to_lists(passage_parts[j]));
      }
      // No else, if it is not a instrument or a line it's a blank line.
    }
    instruments.push({instrument:instrument,lines:lines});
    passages.push({title: passage_title, instruments:instruments});
  }
  return {passages:passages,title:title};
}

function line_to_lists(line)
{
  let ret = [];
  let gatra = line.split('\t');
  for(let i = 0; i < gatra.length; i++)
    ret.push(gatra[i].split(' '))
  return ret;
}

var json_layout = `{
	"title":"Song name",
	"passages":[
		{
			"title":"passage title",
			"instruments":[
				{
					"instrument":"instrument name",
					"lines":[
						[
							["1","2","3","4"],
							["1","2","3","4"],
							["1","2","3","4"],
							["1","2","3","4"]
						]
					]
				}
			]
		}
	]
}`

export function compile_song(song)
{
  let outs = '\n# ' + song['title'] + '\n\n';
  for(let p = 0; p < song['passages'].length; p++)
  {
    outs += '## ' + song['passages'][p]['title'] + '\n';
    for (let l = 0; l < song['passages'][p]['instruments'][0]['lines'].length; l++)
    {
      let line = song['passages'][p]['instruments'][0]['lines'][l];
      for(let g = 0; g < line.length; g++)
      {
        outs += line[g][0] + ' ';
        outs += line[g][1] + ' ';
        outs += line[g][2] + ' ';
        outs += line[g][3] + '\t';
      }
      outs += '\n';
    }
    outs += '\n';
  }
  return outs;
}

export let new_song = `#  Title

## Buka
· · · ·	· · · ·	· · · ·	· · · ·`

var example = `# Asmaradana

## Buka
· 3 · 2	· 3 · 2	3 3 2 2	· 7 · 6

## Irama Lancar
2 7 2 6	2 7 2 3	5 3 2 7	3 2 3 7
6 3 2 7	3 2 7 6	5 3 2 7	3 2 7 6

## Irama Chiblon
2 3 2 7	3 2 7 8	2 3 2 76	72 35 65 3
6 7 3 2	6 3 2 7	3 5 3 2	5 3 2 7
6 7 3 2	6 3 2 7	3 5 3 2	· 7 5 6
5 3 5 3	7 6 2 7	3 5 3 2	· 7 5 6`
