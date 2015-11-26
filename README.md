# Hópverkefni í Vefforritun - Samferða
Benedikt Jónsson

Ingvar Bjarki Einarsson

Þór Stefánsson

##Inngangur
Verkefnið snýst um að gera síðu sem auðveldlega parar saman fólk sem vantar far og ökumenn sem langar til að taka með sér farþega. Notendur skrá sig inn og geta búið til færslur þar sem annað hvort er beðið um far eða farþega. Forsíðan er aðal síðan og þar birtist veggur með öllum færslum sem eru ekki úreltar. Það er hægt að leita í færslunum eftir öllum mögulegum breytum. Notendur geta líka breytt og eytt sínum færslum. 

##Hugmyndin
Síða sem parar saman þá sem vilja far og bílstjóra er ekki ný af nálinni en íslensk síða sem gerir þetta hefur verið til síðan árið 2005. Einnig er íslenskur skutlarahópur á facebook þar sem meðlimir eru fleiri en 20 þúsund. Margar vinsælar erlendar síður og smáforrit eru til sem ganga út á sömu hugmynd.

Hugmyndin okkar var fyrst og fremst að gera nútímalega síðu sem gæti þjónað fólki sem hefur til þessa þurft að nota facebook og 10 ára gamla síðu til þess að fá far.

##Lausn 

###Forsíðan
Á forsíðunni er veggur þar sem færslur eru í röð eftir því hvenær bíltúrinn á að eiga sér stað. Færslurnar eru vistaðar í gagnagrunni og eru sóttar í lykkju á forsíðunni. Leit birtist þegar ýtt er á stækkunargler í svörtum borða efst á síðunni. Í henni er hægt að leita eftir öllum mögulegum breytum og eins mörgum og maður vill á sama tíma. Þá eru javascript föll í frontpage.js keyrð þegar ýtt er á takka og gildum í leitinni breytt. Þau taka inn gildin úr leitinni og úr færslunum og bera þau saman og fela þær færslur sem ekki eiga við. 

Á hverri færslu eru helstu upplýsingar birtar og svo ef ýtt er á færslu birtast undir henni ítarlegri upplýsingar.

Þegar notandi er skráður inn birtast breyta og eyða takkar á þeim færslum sem hann hefur búið til. Í raun eru þessir takkar á faldir öllum færslunum nema þar sem um er að ræða færslu notanda (sjá frontpage.js). Þegar færslu er eytt er id færslunnar sótt í framenda javascript og síðan sent með ajax í bakendann þar færslunni er eytt úr gagnagrunninum.
Breyta takkinn virkar þannig að upplýsingar um færsluna eru vistaðar í staðbundinni geymslu og síðan settar inn í viðeigandi reiti í eyðublaði sem opnast þegar ýtt er á takkann.

###Nýskrá og Innskrá
Á þessari síðu býr maður til notenda þar sem sett er inn notandanafn, lykilorð, símanúmer og netfang. Síðan er ýtt á takka og gildin tekin inn í bakendann þar sem þau eru vistuð í gagnagrunninn.  
Lykilorðið er saltað og hashað til að passa upp á öryggið.
Innskrá síðan virkar síðan eins og í verkefni 6.

###Breyta
Þessi síða kemur upp þegar notandi ýtir á breyta takkann á forsíðunni. Þegar ýtt er á ,,Breyta færslu" eru upplýsingar um færsluna fluttar í bakendann og Update sql skipun notuð til að breyta færslunni.

###Um okkur
Á þessari síðu er stuttur texti um síðuna og okkur sem unnum að verkefninu, einnig myndir.

##Hvað má betur fara?
###Í notkun
Þegar ýtt er á breyta takkann á færslu opnast aukaupplýsingarnar rétt áður en maður fer yfir á síðuna þar sem færslu er breytt
###Almennt
Til að síðan nýtist fólki sem best þyrfti að vinna að útfærslu hennar í samstarfi við fólk sem er að nota hana, til að greina almennilega þarfir notendanna. 
Mögulega væri hægt að skipta henni í tvo hluta eftir því hvort beðið væri um far innanbæjar eða úti á landi þar sem stórt hlutfall notenda væri ef til vill bara að leita að fari innanbæjar. Athugasemda eiginleiki á færslur gæti verið sniðugt að bæta við og hefðum við líklega bætt því við ef þetta væri stærra vekefni.
##Lokaorð
Ljóst er að grundvöllur fyrir síðu af þessu tagi er til staðar á Íslandi en hún þyrfti að vera vel gerð og auglýst þannig að fólk myndi byrja að nota hana til að hún myndi virka. Hún byggist nefninlega á því að notendur skrifi færslur inn á hana.

Verkefnið gekk vel og við náðum að búa til alla grunnvirkni sem við vorum að vonast eftir auk þess sem okkur tókst að bæta við ýmis konar virkni sem okkur datt í hug á meðan gerð síðunnar stóð.













