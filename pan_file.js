import * as RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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
  while (str.includes('\t'))
    str = str.replace('\t',' ')

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
    while (passage_title[0] == ' ')
      passage_title = passage_title.substring(1);
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
      else if (passage_parts[j].includes(' '))// may be a line of music
      {
        let raw_notes = (passage_parts[j]).split(' ');
        let notes = [];
        for(let i = 0; i< raw_notes.length; i++)
        {
          let left = '';
          let right = '';
          if(raw_notes[i].length == 1)
            left = raw_notes[i]
          else {
            left = raw_notes[i][0]
            right = raw_notes[i][1]
          }
          notes.push({left:left,right:right,left_diacritic:'',right_diacritic:''});
        }
        if (notes.length >= 16)
          lines.push(notes);
      }
      // No else, if it is not a instrument or a line it's a blank line.
    }
    instruments.push({instrument:instrument,lines:lines});
    passages.push({title: passage_title, instruments:instruments});
  }
  console.log({passages:passages,title:title});
  return {passages:passages,title:title};
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
							["1","2","3","4","1","2","3","4","1","2","3","4","1","2","3","4"]
						]
					]
				}
			]
		}
	]
}`

export function compile_song(song)
{
  let outs = '# ' + song['title'] + '\n\n';
  for(let p = 0; p < song['passages'].length; p++)
  {
    outs += '## ' + song['passages'][p]['title'] + '\n';
    for (let l = 0; l < song['passages'][p]['instruments'][0]['lines'].length; l++)
    {
      let line = song['passages'][p]['instruments'][0]['lines'][l];
      outs += line.join(' ')
      outs += '\n';
    }
    outs += '\n';
  }
  return outs;
}

export async function export_song(song)
{
    let options = {
      html: render_song(song),
      fileName: song['title'],
      directory: 'Documents'
    };
    console.log('creating pdf: ', options);
    console.log(RNHTMLtoPDF);
    let file = await RNHTMLtoPDF.convert(options)
    .then((data) => {
      console.log(data.filePath);
      console.log(data.base64);
      alert(song['title'] + ' was saved exported ');
    })
    .catch((err) => {
      console.error(err);
      console.log("ERROR HONDLED");
    });
}

function render_song(song)
{
  let passages = ''
  for (let p=0; p < song['passages'].length; p++)
  {
    let lines = song['passages'][p]['instruments'][0]['lines'];
    let str_lines = ''
    for (let l=0; l<lines.length; l++)
    {
      for (let n=0; n<16; n++)
        str_lines += '<span style="min-width: 50px;">' + lines[l][n] + '</span>\n';
      str_lines += '<br/>';
    }
    str_lines = str_lines.replace('\\"','\"');
    passages += `<h3>${song['passages'][p]['title']}</h3><br/>${str_lines}<br/>`

  }

  let title = song['title'];
  return `<h1>${title}</h1><br>${passages}`
}

export function save_song(song)
{
  requestExternalWrite()
  let path = RNFS.DocumentDirectoryPath + '/' + song['title'] + '.pan';
  RNFS.writeFile(path,compile_song(song))
    .then((success) => {
      alert(song['title'] + ' was saved succesfully');
    })
    .catch((err) => {
      alert('Error saving file: ' + err.message);
    })
}


export let new_song = `#  Title

## Buka
· · · ·	· · · ·	· · · ·	· · · ·`

var example = `# Asmaradana

## Buka
· 3 · 2 · 3 · 2 3 3 2 2 · 7 · 6

## Irama Lancar
2 7 2 6 2 7 2 3 5 3 2 7 3 2 3 7
6 3 2 7 3 2 7 6 5 3 2 7 3 2 7 6

## Irama Chiblon
2 3 2 7 3 2 7 8 2 3 2 76 72 35 65 3
6 7 3 2 6 3 2 7 3 5 3 2 5 3 2 7
6 7 3 2 6 3 2 7 3 5 3 2 · 7 5 6
5 3 5 3 7 6 2 7 3 5 3 2 · 7 5 6`
