import * as RNFS from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

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

var json_layout = `{
	"title":"title",
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

export async function export_song(song)
{
    let options = {
      html: render_song(song),
      fileName: song['title'],
      directory: 'Documents',
      fonts: [resolveAssetSource(require('assets/fonts/kepatihan.ttf')).uri]
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
  console.log('song');
  console.log(song);
  let passages = ''
  for (let p=0; p < song['passages'].length; p++)
  {
    let lines = song['passages'][p]['instruments'][0]['lines'];
    console.log(`Lines for ${song['passages'][p]['title']}`);
    console.log(lines)
    let str_lines = '<span style="font-family:kepatihan">'
    for (let l=0; l<lines.length; l++)
    {
      // console.log('line');
      // console.log(lines[l]);
      for (let n=0; n<16; n++)
      {
        // console.log('note');
        // console.log(lines[l][0][n]);
        if (lines[l][n] === undefined)
          continue
          // str_lines += '<span style="min-width: 50px;">h</span>\n';
        else
        {
          let note = lines[l][n].left_diacritic + lines[l][n].left;
          note += lines[l][n].right_diacritic + lines[l][n].right;
          str_lines += '<span style="min-width: 50px;">' + note + '</span>\n';
        }
      }
      str_lines += '</span><br/>';
    }
    //str_lines = str_lines.replace('\\"','\"');
    passages += `<h3>${song['passages'][p]['title']}</h3><br/>${str_lines}<br/>`

  }

  let title = song['title'];
  return `<h1>${title}</h1><br>${passages}`
}

export function save_song(song)
{
  requestExternalWrite()
  let path = RNFS.DocumentDirectoryPath + '/' + song['title'] + '.pan';
  RNFS.writeFile(path,JSON.stringify(song))
    .then((success) => {
      alert(song['title'] + ' was saved succesfully');
    })
    .catch((err) => {
      alert('Error saving file: ' + err.message);
    })
}


// export let new_song = `#  Title
//
// ## Buka
// · · · ·	· · · ·	· · · ·	· · · ·`

export let new_song = `{
	"title":"title",
	"passages":[
		{
			"title":"passage title",
			"instruments":[
				{
					"instrument":"instrument name",
					"lines":[
						[
							[{"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""},
               {"left": "·", "left_diacritic": "", "right": "", "right_diacritic": ""}]
						]
					]
				}
			]
		}
	]
}`


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
