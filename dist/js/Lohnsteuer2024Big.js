/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
var Lohnsteuer2024 = /** @class */ (function () {
    function Lohnsteuer2024() {
        this.Z_0 = new Big(0);
        this.Z_1 = new Big(1);
        this.Z_10 = new Big(10);
        /**  Stand: 2024-03-11 09:00 */
        /**  ITZBund Berlin  */
        /**   EINGABEPARAMETER   */
        /**  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)  */
        this.af = 1;
        /**  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG
             sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen
             (§ 19a Absatz 4 EStG) in Cent  */
        this.ENTSCH = this.Z_0;
        /**  eingetragener Faktor mit drei Nachkommastellen  */
        this.f = 1.0;
        /**  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
             Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
             als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
             als Monatsbetrag anzugeben). */
        this.PKPV = this.Z_0;
        /**  Krankenversicherung:
             0 = gesetzlich krankenversicherte Arbeitnehmer
             1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
             2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss  */
        this.PKV = 0;
        /**  Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
             bei mehr als einem Kind
             0 = kein Abschlag
             1 = Beitragsabschlag für das 2. Kind
             2 = Beitragsabschläge für das 2. und 3. Kind
             3 = Beitragsabschläge für 2. bis 4. Kinder
             4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder    */
        this.PVA = new Big(0);
        /**  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                zu berücksichtigen wären, sonst 0.  */
        this.PVS = 0;
        /**  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                zu zahlen hat, sonst 0.  */
        this.PVZ = 0;
        /**  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
             Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent  */
        this.JRE4ENT = this.Z_0;
        /**  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht
             tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent  */
        this.SONSTENT = this.Z_0;
        /**   AUSGABEPARAMETER   */
        /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
        this.BK = this.Z_0;
        /**  Bemessungsgrundlage der sonstigen Bezüge (ohne Vergütung für mehrjährige Tätigkeit)
             für die Kirchenlohnsteuer in Cent.
             Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
             Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
             (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
             im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.  */
        this.BKS = this.Z_0;
        /**  Bemessungsgrundlage der Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
             zu besteuernden Vorteile bei Vermögensbeteiligungen für die Kirchenlohnsteuer in Cent   */
        this.BKV = this.Z_0;
        /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
        this.LSTLZZ = this.Z_0;
        /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
             in Cents  */
        this.SOLZLZZ = this.Z_0;
        /**  Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit in Cent.
             Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
             (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern SOLZLZZ (maximal bis 0). Der
             Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
             Veranlagung zur Einkommensteuer bleibt unberührt.  */
        this.SOLZS = this.Z_0;
        /**  Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
             zu besteuernden Vorteile bei Vermögensbeteiligungen in Cent  */
        this.SOLZV = this.Z_0;
        /**  Lohnsteuer für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit und ohne
             tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen) in Cent
             Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
             (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
             Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
             Veranlagung zur Einkommensteuer bleibt unberührt.  */
        this.STS = this.Z_0;
        /**  Lohnsteuer für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt zu besteuernden
             Vorteile bei Vermögensbeteiligungen in Cent  */
        this.STV = this.Z_0;
        /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
             privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
             die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
             steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
             steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
             VKVSONST  */
        this.VKVLZZ = this.Z_0;
        /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
             zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
             auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
             auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen für mehrjährige
             Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.  */
        this.VKVSONST = this.Z_0;
        /**   AUSGABEPARAMETER DBA   */
        /**  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent  */
        this.VFRB = this.Z_0;
        /**  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
        this.VFRBS1 = this.Z_0;
        /**  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent  */
        this.VFRBS2 = this.Z_0;
        /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
            dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent  */
        this.WVFRB = this.Z_0;
        /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
            bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
        this.WVFRBO = this.Z_0;
        /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
            über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent  */
        this.WVFRBM = this.Z_0;
        /**   INTERNE FELDER   */
        /**  Altersentlastungsbetrag nach Alterseinkünftegesetz in €,
             Cent (2 Dezimalstellen)  */
        this.ALTE = this.Z_0;
        /**  Arbeitnehmer-Pauschbetrag in EURO  */
        this.ANP = this.Z_0;
        /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
             auf ganze Cents abgerundet  */
        this.ANTEIL1 = this.Z_0;
        /**  Bemessungsgrundlage für Altersentlastungsbetrag in €, Cent
             (2 Dezimalstellen)  */
        this.BMG = this.Z_0;
        /**  Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung
            und der sozialen Pflegeversicherung in Euro  */
        this.BBGKVPV = this.Z_0;
        /**  allgemeine Beitragsbemessungsgrenze in der allgemeinen Renten-versicherung in Euro  */
        this.BBGRV = this.Z_0;
        /**  Differenz zwischen ST1 und ST2 in EURO  */
        this.DIFF = this.Z_0;
        /**  Entlastungsbetrag für Alleinerziehende in Euro  */
        this.EFA = this.Z_0;
        /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen)  */
        this.FVB = this.Z_0;
        /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen) für die Berechnung
             der Lohnsteuer für den sonstigen Bezug  */
        this.FVBSO = this.Z_0;
        /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
        this.FVBZ = this.Z_0;
        /**  Zuschlag zum Versorgungsfreibetrag in EURO fuer die Berechnung
             der Lohnsteuer beim sonstigen Bezug  */
        this.FVBZSO = this.Z_0;
        /**  Grundfreibetrag in Euro  */
        this.GFB = this.Z_0;
        /**  Maximaler Altersentlastungsbetrag in €  */
        this.HBALTE = this.Z_0;
        /**  Massgeblicher maximaler Versorgungsfreibetrag in €  */
        this.HFVB = this.Z_0;
        /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €,Cent
             (2 Dezimalstellen)  */
        this.HFVBZ = this.Z_0;
        /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €, Cent
             (2 Dezimalstellen) für die Berechnung der Lohnsteuer für den
             sonstigen Bezug  */
        this.HFVBZSO = this.Z_0;
        /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
        this.J = 0;
        /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
             Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
        this.JBMG = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechneter LZZFREIB in €, Cent
             (2 Dezimalstellen)  */
        this.JLFREIB = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnete LZZHINZU in €, Cent
             (2 Dezimalstellen)  */
        this.JLHINZU = this.Z_0;
        /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
             UPANTEIL errechnet werden soll in Cents  */
        this.JW = this.Z_0;
        /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
        this.K = 0;
        /**  Merker für Berechnung Lohnsteuer für mehrjährige Tätigkeit.
             0 = normale Steuerberechnung
             1 = Steuerberechnung für mehrjährige Tätigkeit
             2 = entfällt  */
        this.KENNVMT = 0;
        /**  Summe der Freibetraege fuer Kinder in EURO  */
        this.KFB = this.Z_0;
        /**  Beitragssatz des Arbeitgebers zur Krankenversicherung  */
        this.KVSATZAG = this.Z_0;
        /**  Beitragssatz des Arbeitnehmers zur Krankenversicherung  */
        this.KVSATZAN = this.Z_0;
        /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
              1 = Grundtabelle
              2 = Splittingtabelle  */
        this.KZTAB = 0;
        /**  Jahreslohnsteuer in EURO  */
        this.LSTJAHR = this.Z_0;
        /**  Zwischenfelder der Jahreslohnsteuer in Cent  */
        this.LST1 = this.Z_0;
        this.LST2 = this.Z_0;
        this.LST3 = this.Z_0;
        this.LSTOSO = this.Z_0;
        this.LSTSO = this.Z_0;
        /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
        this.MIST = this.Z_0;
        /**  Beitragssatz des Arbeitgebers zur Pflegeversicherung (6 Dezimalstellen) */
        this.PVSATZAG = this.Z_0;
        /**  Beitragssatz des Arbeitnehmers zur Pflegeversicherung (6 Dezimalstellen) */
        this.PVSATZAN = this.Z_0;
        /**  Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)   */
        this.RVSATZAN = this.Z_0;
        /**  Rechenwert in Gleitkommadarstellung  */
        this.RW = this.Z_0;
        /**  Sonderausgaben-Pauschbetrag in EURO  */
        this.SAP = this.Z_0;
        /**  Freigrenze fuer den Solidaritaetszuschlag in EURO  */
        this.SOLZFREI = this.Z_0;
        /**  Solidaritaetszuschlag auf die Jahreslohnsteuer in EURO, C (2 Dezimalstellen)  */
        this.SOLZJ = this.Z_0;
        /**  Zwischenwert fuer den Solidaritaetszuschlag auf die Jahreslohnsteuer
             in EURO, C (2 Dezimalstellen)  */
        this.SOLZMIN = this.Z_0;
        /**  Neu ab 2021: Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Euro  */
        this.SOLZSBMG = this.Z_0;
        /**  Neu ab 2021: Zu versteuerndes Einkommen für die Ermittlung der Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Euro, Cent (2 Dezimalstellen)  */
        this.SOLZSZVE = this.Z_0;
        /**  Neu ab 2021: Bemessungsgrundlage des Solidaritätszuschlags für die Prüfung der Freigrenze beim Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit in Euro  */
        this.SOLZVBMG = this.Z_0;
        /**  Tarifliche Einkommensteuer in EURO  */
        this.ST = this.Z_0;
        /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in EURO  */
        this.ST1 = this.Z_0;
        /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in EURO  */
        this.ST2 = this.Z_0;
        /**  Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehrjährige Tätigkeit  */
        this.STOVMT = this.Z_0;
        /**  Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)  */
        this.TBSVORV = this.Z_0;
        /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
        this.VBEZB = this.Z_0;
        /**  Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für
             den sonstigen Bezug  */
        this.VBEZBSO = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
        this.VHB = this.Z_0;
        /**  Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
        this.VSP = this.Z_0;
        /**  Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
        this.VSPN = this.Z_0;
        /**  Zwischenwert 1 bei der Berechnung der Vorsorgepauschale nach
             dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
        this.VSP1 = this.Z_0;
        /**  Zwischenwert 2 bei der Berechnung der Vorsorgepauschale nach
             dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
        this.VSP2 = this.Z_0;
        /**  Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und
             soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die
             private Basiskrankenversicherung und private Pflege-Pflichtversicherung
             in Euro, Cent (2 Dezimalstellen)  */
        this.VSP3 = this.Z_0;
        /**  Erster Grenzwert in Steuerklasse V/VI in Euro  */
        this.W1STKL5 = this.Z_0;
        /**  Zweiter Grenzwert in Steuerklasse V/VI in Euro  */
        this.W2STKL5 = this.Z_0;
        /**  Dritter Grenzwert in Steuerklasse V/VI in Euro  */
        this.W3STKL5 = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 2 EStG in EURO  */
        this.VSPMAX1 = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 3 EStG in EURO  */
        this.VSPMAX2 = this.Z_0;
        /**  Vorsorgepauschale nach § 10c Abs. 2 Satz 2 EStG vor der Hoechstbetragsberechnung
             in EURO, C (2 Dezimalstellen)  */
        this.VSPO = this.Z_0;
        /**  Fuer den Abzug nach § 10c Abs. 2 Nrn. 2 und 3 EStG verbleibender
             Rest von VSPO in EURO, C (2 Dezimalstellen)  */
        this.VSPREST = this.Z_0;
        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 1 EStG
             in EURO, C (2 Dezimalstellen)  */
        this.VSPVOR = this.Z_0;
        /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG €, C
             (2 Dezimalstellen)  */
        this.X = this.Z_0;
        /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
        this.Y = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
             nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4.  */
        this.ZRE4 = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)  */
        this.ZRE4J = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
             nach Abzug des Versorgungsfreibetrags und des Alterentlastungsbetrags
             zur Berechnung der Vorsorgepauschale in €, Cent (2 Dezimalstellen)  */
        this.ZRE4VP = this.Z_0;
        /**  Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in €, Cent
             (2 Dezimalstellen)  */
        this.ZTABFB = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
             EURO, C (2 Dezimalstellen)  */
        this.ZVBEZ = this.Z_0;
        /**  Auf einen Jahreslohn hochgerechnetes VBEZ in €, C (2 Dezimalstellen)  */
        this.ZVBEZJ = this.Z_0;
        /**  Zu versteuerndes Einkommen in €, C (2 Dezimalstellen)  */
        this.ZVE = this.Z_0;
        /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
             Abs. 2 Satz 7 EStG in €  */
        this.ZX = this.Z_0;
        this.ZZX = this.Z_0;
        this.HOCH = this.Z_0;
        this.VERGL = this.Z_0;
        /**  Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und
             privaten Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale) in Cent.  */
        this.VKV = this.Z_0;
        /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
        this.TAB1 = [new Big(0.0), new Big(0.4), new Big(0.384), new Big(0.368), new Big(0.352), new Big(0.336), new Big(0.32), new Big(0.304), new Big(0.288), new Big(0.272), new Big(0.256), new Big(0.24), new Big(0.224), new Big(0.208), new Big(0.192), new Big(0.176), new Big(0.16), new Big(0.152), new Big(0.144), new Big(0.136), new Big(0.128), new Big(0.12), new Big(0.112), new Big(0.104), new Big(0.096), new Big(0.088), new Big(0.08), new Big(0.072), new Big(0.064), new Big(0.056), new Big(0.048), new Big(0.04), new Big(0.032), new Big(0.024), new Big(0.016), new Big(0.008), new Big(0.0)];
        /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
        this.TAB2 = [new Big(0), new Big(3000), new Big(2880), new Big(2760), new Big(2640), new Big(2520), new Big(2400), new Big(2280), new Big(2160), new Big(2040), new Big(1920), new Big(1800), new Big(1680), new Big(1560), new Big(1440), new Big(1320), new Big(1200), new Big(1140), new Big(1080), new Big(1020), new Big(960), new Big(900), new Big(840), new Big(780), new Big(720), new Big(660), new Big(600), new Big(540), new Big(480), new Big(420), new Big(360), new Big(300), new Big(240), new Big(180), new Big(120), new Big(60), new Big(0)];
        /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
        this.TAB3 = [new Big(0), new Big(900), new Big(864), new Big(828), new Big(792), new Big(756), new Big(720), new Big(684), new Big(648), new Big(612), new Big(576), new Big(540), new Big(504), new Big(468), new Big(432), new Big(396), new Big(360), new Big(342), new Big(324), new Big(306), new Big(288), new Big(270), new Big(252), new Big(234), new Big(216), new Big(198), new Big(180), new Big(162), new Big(144), new Big(126), new Big(108), new Big(90), new Big(72), new Big(54), new Big(36), new Big(18), new Big(0)];
        /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
        this.TAB4 = [new Big(0.0), new Big(0.4), new Big(0.384), new Big(0.368), new Big(0.352), new Big(0.336), new Big(0.32), new Big(0.304), new Big(0.288), new Big(0.272), new Big(0.256), new Big(0.24), new Big(0.224), new Big(0.208), new Big(0.192), new Big(0.176), new Big(0.16), new Big(0.152), new Big(0.144), new Big(0.136), new Big(0.128), new Big(0.12), new Big(0.112), new Big(0.104), new Big(0.096), new Big(0.088), new Big(0.08), new Big(0.072), new Big(0.064), new Big(0.056), new Big(0.048), new Big(0.04), new Big(0.032), new Big(0.024), new Big(0.016), new Big(0.008), new Big(0.0)];
        /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
        this.TAB5 = [new Big(0), new Big(1900), new Big(1824), new Big(1748), new Big(1672), new Big(1596), new Big(1520), new Big(1444), new Big(1368), new Big(1292), new Big(1216), new Big(1140), new Big(1064), new Big(988), new Big(912), new Big(836), new Big(760), new Big(722), new Big(684), new Big(646), new Big(608), new Big(570), new Big(532), new Big(494), new Big(456), new Big(418), new Big(380), new Big(342), new Big(304), new Big(266), new Big(228), new Big(190), new Big(152), new Big(114), new Big(76), new Big(38), new Big(0)];
        /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
        this.ZAHL1 = this.Z_1;
        this.ZAHL2 = new Big(2);
        this.ZAHL5 = new Big(5);
        this.ZAHL7 = new Big(7);
        this.ZAHL12 = new Big(12);
        this.ZAHL100 = new Big(100);
        this.ZAHL360 = new Big(360);
        this.ZAHL500 = new Big(500);
        this.ZAHL700 = new Big(700);
        this.ZAHL1000 = new Big(1000);
        this.ZAHL10000 = new Big(10000);
    }
    /**  PROGRAMMABLAUFPLAN, PAP Seite 14  */
    Lohnsteuer2024.prototype.calculate = function () {
        this.MPARA();
        this.MRE4JL();
        this.VBEZBSO = this.Z_0;
        this.KENNVMT = 0;
        this.MRE4();
        this.MRE4ABZ();
        this.MBERECH();
        this.MSONST();
        this.MVMT();
    };
    /**  Zuweisung von Werten für bestimmte Sozialversicherungsparameter  PAP Seite 15  */
    Lohnsteuer2024.prototype.MPARA = function () {
        if (this.KRV < 2) { /**  &lt; = <  */
            if (this.KRV == 0) {
                this.BBGRV = new Big(90600); /**  Geändert für 2024  */
            }
            else {
                this.BBGRV = new Big(89400); /**  Geändert für 2024  */
            }
            this.RVSATZAN = new Big(0.093); /**  Neu 2019  */
        }
        else {
            /**  Nichts zu tun  */
        }
        this.BBGKVPV = new Big(62100); /**  Geändert für 2024  */
        this.KVSATZAN = (this.KVZ.div(this.ZAHL2).div(this.ZAHL100)).add(new Big(0.07)); /**  Neu 2019  */
        this.KVSATZAG = new Big(0.0085).add(new Big(0.07)); /**  geändert für 2024  */
        /**  geändert ab 2024  */
        if (this.PVS == 1) {
            this.PVSATZAN = new Big(0.022);
            this.PVSATZAG = new Big(0.012);
        }
        else {
            this.PVSATZAN = new Big(0.017);
            this.PVSATZAG = new Big(0.017);
        }
        if (this.PVZ == 1) {
            this.PVSATZAN = this.PVSATZAN.add(new Big(0.006));
        }
        else {
            this.PVSATZAN = this.PVSATZAN.sub(this.PVA.mul(new Big(0.0025)));
        }
        this.W1STKL5 = new Big(13279); /**  geändert 2024  */
        this.W2STKL5 = new Big(33380); /**  geändert 2024  */
        this.W3STKL5 = new Big(222260);
        this.GFB = new Big(11604); /**  geändert 2024  */
        this.SOLZFREI = new Big(18130); /**  geändert 2024  */
    };
    /**  Ermittlung des Jahresarbeitslohns nach § 39 b Abs. 2 Satz 2 EStG, PAP Seite 16  */
    Lohnsteuer2024.prototype.MRE4JL = function () {
        if (this.LZZ == 1) {
            this.ZRE4J = this.RE4.div(this.ZAHL100).round(2, Big.roundDown);
            this.ZVBEZJ = this.VBEZ.div(this.ZAHL100).round(2, Big.roundDown);
            this.JLFREIB = this.LZZFREIB.div(this.ZAHL100).round(2, Big.roundDown);
            this.JLHINZU = this.LZZHINZU.div(this.ZAHL100).round(2, Big.roundDown);
        }
        else {
            if (this.LZZ == 2) {
                this.ZRE4J = (this.RE4.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
                this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
                this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
                this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL12)).div(this.ZAHL100).round(2, Big.roundDown);
            }
            else {
                if (this.LZZ == 3) {
                    this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                    this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                    this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                    this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL700).round(2, Big.roundDown);
                }
                else {
                    this.ZRE4J = (this.RE4.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                    this.ZVBEZJ = (this.VBEZ.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                    this.JLFREIB = (this.LZZFREIB.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                    this.JLHINZU = (this.LZZHINZU.mul(this.ZAHL360)).div(this.ZAHL100).round(2, Big.roundDown);
                }
            }
        }
        if (this.af == 0) {
            this.f = 1;
        }
    };
    /**  Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 17  */
    Lohnsteuer2024.prototype.MRE4 = function () {
        if (this.ZVBEZJ.cmp(this.Z_0) == 0) {
            this.FVBZ = this.Z_0;
            this.FVB = this.Z_0;
            this.FVBZSO = this.Z_0;
            this.FVBSO = this.Z_0;
        }
        else {
            if (this.VJAHR < 2006) {
                this.J = 1;
            }
            else {
                if (this.VJAHR < 2040) {
                    this.J = this.VJAHR - 2004;
                }
                else {
                    this.J = 36;
                }
            }
            if (this.LZZ == 1) {
                this.VBEZB = (this.VBEZM.mul(new Big(this.ZMVB))).add(this.VBEZS);
                this.HFVB = this.TAB2[this.J].div(this.ZAHL12).mul(new Big(this.ZMVB));
                this.FVBZ = this.TAB3[this.J].div(this.ZAHL12).mul(new Big(this.ZMVB)).round(0, Big.roundUp);
            }
            else {
                this.VBEZB = ((this.VBEZM.mul(this.ZAHL12)).add(this.VBEZS)).round(2, Big.roundDown);
                this.HFVB = this.TAB2[this.J];
                this.FVBZ = this.TAB3[this.J];
            }
            this.FVB = ((this.VBEZB.mul(this.TAB1[this.J]))).div(this.ZAHL100).round(2, Big.roundUp);
            if (this.FVB.cmp(this.HFVB) == 1) {
                this.FVB = this.HFVB;
            }
            if (this.FVB.cmp(this.ZVBEZJ) == 1) {
                this.FVB = this.ZVBEZJ;
            }
            this.FVBSO = (this.FVB.add((this.VBEZBSO.mul(this.TAB1[this.J])).div(this.ZAHL100))).round(2, Big.roundUp);
            if (this.FVBSO.cmp(this.TAB2[this.J]) == 1) {
                this.FVBSO = this.TAB2[this.J];
            }
            this.HFVBZSO = (((this.VBEZB.add(this.VBEZBSO)).div(this.ZAHL100)).sub(this.FVBSO)).round(2, Big.roundDown);
            this.FVBZSO = (this.FVBZ.add((this.VBEZBSO).div(this.ZAHL100))).round(0, Big.roundUp);
            if (this.FVBZSO.cmp(this.HFVBZSO) == 1) {
                this.FVBZSO = this.HFVBZSO.round(0, Big.roundUp);
            }
            if (this.FVBZSO.cmp(this.TAB3[this.J]) == 1) {
                this.FVBZSO = this.TAB3[this.J];
            }
            this.HFVBZ = ((this.VBEZB.div(this.ZAHL100)).sub(this.FVB)).round(2, Big.roundDown);
            if (this.FVBZ.cmp(this.HFVBZ) == 1) {
                this.FVBZ = this.HFVBZ.round(0, Big.roundUp);
            }
        }
        this.MRE4ALTE();
    };
    /**  Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 18  */
    Lohnsteuer2024.prototype.MRE4ALTE = function () {
        if (this.ALTER1 == 0) {
            this.ALTE = this.Z_0;
        }
        else {
            if (this.AJAHR < 2006) {
                this.K = 1;
            }
            else {
                if (this.AJAHR < 2040) {
                    this.K = this.AJAHR - 2004;
                }
                else {
                    this.K = 36;
                }
            }
            this.BMG = this.ZRE4J.sub(this.ZVBEZJ);
            /**  Lt. PAP muss hier auf ganze EUR gerundet werden  */
            this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(0, Big.roundUp);
            this.HBALTE = this.TAB5[this.K];
            if (this.ALTE.cmp(this.HBALTE) == 1) {
                this.ALTE = this.HBALTE;
            }
        }
    };
    /**  Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 20  */
    Lohnsteuer2024.prototype.MRE4ABZ = function () {
        this.ZRE4 = (this.ZRE4J.sub(this.FVB).sub(this.ALTE).sub(this.JLFREIB).add(this.JLHINZU)).round(2, Big.roundDown);
        if (this.ZRE4.cmp(this.Z_0) == -1) {
            this.ZRE4 = this.Z_0;
        }
        this.ZRE4VP = this.ZRE4J;
        if (this.KENNVMT == 2) {
            this.ZRE4VP = this.ZRE4VP.sub(this.ENTSCH.div(this.ZAHL100)).round(2, Big.roundDown);
        }
        this.ZVBEZ = this.ZVBEZJ.sub(this.FVB).round(2, Big.roundDown);
        if (this.ZVBEZ.cmp(this.Z_0) == -1) {
            this.ZVBEZ = this.Z_0;
        }
    };
    /**  Berechnung fuer laufende Lohnzahlungszeitraueme Seite 21 */
    Lohnsteuer2024.prototype.MBERECH = function () {
        this.MZTABFB();
        this.VFRB = ((this.ANP.add(this.FVB.add(this.FVBZ))).mul(this.ZAHL100)).round(0, Big.roundDown);
        this.MLSTJAHR();
        this.WVFRB = ((this.ZVE.sub(this.GFB)).mul(this.ZAHL100)).round(0, Big.roundDown);
        if (this.WVFRB.cmp(this.Z_0) == -1) { /**  WVFRB < 0  */
            this.WVFRB = new Big(0);
        }
        this.LSTJAHR = (this.ST.mul(new Big(this.f))).round(0, Big.roundDown);
        this.UPLSTLZZ();
        this.UPVKVLZZ();
        if (this.ZKF.cmp(this.Z_0) == 1) { /**  ZKF > 0  */
            this.ZTABFB = this.ZTABFB.add(this.KFB);
            this.MRE4ABZ();
            this.MLSTJAHR();
            this.JBMG = (this.ST.mul(new Big(this.f))).round(0, Big.roundDown);
        }
        else {
            this.JBMG = this.LSTJAHR;
        }
        this.MSOLZ();
    };
    /**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 22  */
    Lohnsteuer2024.prototype.MZTABFB = function () {
        this.ANP = this.Z_0;
        if (this.ZVBEZ.cmp(this.Z_0) >= 0 && this.ZVBEZ.cmp(this.FVBZ) == -1) {
            this.FVBZ = new Big(this.ZVBEZ.toNumber());
        }
        if (this.STKL < 6) {
            if (this.ZVBEZ.cmp(this.Z_0) == 1) {
                if ((this.ZVBEZ.sub(this.FVBZ)).cmp(new Big(102)) == -1) {
                    this.ANP = (this.ZVBEZ.sub(this.FVBZ)).round(0, Big.roundUp);
                }
                else {
                    this.ANP = new Big(102);
                }
            }
        }
        else {
            this.FVBZ = new Big(0);
            this.FVBZSO = new Big(0);
        }
        if (this.STKL < 6) {
            if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
                if (this.ZRE4.sub(this.ZVBEZ).cmp(new Big(1230)) == -1) { /**  Geändert für 2023  */
                    this.ANP = this.ANP.add(this.ZRE4).sub(this.ZVBEZ).round(0, Big.roundUp);
                }
                else {
                    this.ANP = this.ANP.add(new Big(1230)); /**  Geändert für 2023  */
                }
            }
        }
        this.KZTAB = 1;
        if (this.STKL == 1) {
            this.SAP = new Big(36);
            this.KFB = (this.ZKF.mul(new Big(9312))).round(0, Big.roundDown); /**  Geändert für 2024  */
        }
        else {
            if (this.STKL == 2) {
                this.EFA = new Big(4260); /**  Geändert für 2023  */
                this.SAP = new Big(36);
                this.KFB = (this.ZKF.mul(new Big(9312))).round(0, Big.roundDown); /**  Geändert für 2024  */
            }
            else {
                if (this.STKL == 3) {
                    this.KZTAB = 2;
                    this.SAP = new Big(36);
                    this.KFB = (this.ZKF.mul(new Big(9312))).round(0, Big.roundDown); /**  Geändert für 2024  */
                }
                else {
                    if (this.STKL == 4) {
                        this.SAP = new Big(36);
                        this.KFB = (this.ZKF.mul(new Big(4656))).round(0, Big.roundDown); /**  Geändert für 2024  */
                    }
                    else {
                        if (this.STKL == 5) {
                            this.SAP = new Big(36);
                            this.KFB = this.Z_0;
                        }
                        else {
                            this.KFB = this.Z_0;
                        }
                    }
                }
            }
        }
        this.ZTABFB = (this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ)).round(2, Big.roundDown);
    };
    /**  Ermittlung Jahreslohnsteuer, PAP Seite 23  */
    Lohnsteuer2024.prototype.MLSTJAHR = function () {
        this.UPEVP();
        if (this.KENNVMT != 1) {
            this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP)).round(2, Big.roundDown);
            this.UPMLST();
        }
        else {
            this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP).sub((this.VMT).div(this.ZAHL100)).sub((this.VKAPA).div(this.ZAHL100))).round(2, Big.roundDown);
            if (this.ZVE.cmp(this.Z_0) == -1) {
                this.ZVE = this.ZVE.add(this.VMT.div(this.ZAHL100)).add(this.VKAPA.div(this.ZAHL100)).div(this.ZAHL5).round(2, Big.roundDown);
                this.UPMLST();
                this.ST = (this.ST.mul(this.ZAHL5)).round(0, Big.roundDown);
            }
            else {
                this.UPMLST();
                this.STOVMT = this.ST;
                this.ZVE = (this.ZVE.add(((this.VMT.add(this.VKAPA)).div(this.ZAHL500)))).round(2, Big.roundDown);
                this.UPMLST();
                this.ST = (((this.ST.sub(this.STOVMT)).mul(this.ZAHL5)).add(this.STOVMT)).round(0, Big.roundDown);
            }
        }
    };
    /**  PAP Seite 24  */
    Lohnsteuer2024.prototype.UPVKVLZZ = function () {
        this.UPVKV();
        this.JW = this.VKV;
        this.UPANTEIL();
        this.VKVLZZ = this.ANTEIL1;
    };
    /**  PAP Seite 24  */
    Lohnsteuer2024.prototype.UPVKV = function () {
        if (this.PKV > 0) {
            if (this.VSP2.cmp(this.VSP3) == 1) {
                this.VKV = this.VSP2.mul(this.ZAHL100);
            }
            else {
                this.VKV = this.VSP3.mul(this.ZAHL100);
            }
        }
        else {
            this.VKV = this.Z_0;
        }
    };
    /**  PAP Seite 25  */
    Lohnsteuer2024.prototype.UPLSTLZZ = function () {
        this.JW = this.LSTJAHR.mul(this.ZAHL100);
        this.UPANTEIL();
        this.LSTLZZ = this.ANTEIL1;
    };
    /**  Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif. PAP Seite 26  */
    Lohnsteuer2024.prototype.UPMLST = function () {
        if (this.ZVE.cmp(this.ZAHL1) == -1) {
            this.ZVE = this.Z_0;
            this.X = this.Z_0;
        }
        else {
            this.X = (this.ZVE.div(new Big(this.KZTAB))).round(0, Big.roundDown);
        }
        if (this.STKL < 5) {
            /**  Änderung für 2024  */
            this.UPTAB24();
        }
        else {
            this.MST5_6();
        }
    };
    /**  	Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG) PAP Seite 27   */
    Lohnsteuer2024.prototype.UPEVP = function () {
        if (this.KRV > 1) { /**  &lt; = < &gt; = >  */
            this.VSP1 = this.Z_0;
        }
        else {
            if (this.ZRE4VP.cmp(this.BBGRV) == 1) {
                this.ZRE4VP = this.BBGRV;
            }
            this.VSP1 = (this.ZRE4VP.mul(this.RVSATZAN)).round(2, Big.roundDown); /**   geändert 2024  */
        }
        this.VSP2 = (this.ZRE4VP.mul(new Big(0.12))).round(2, Big.roundDown);
        if (this.STKL == 3) {
            this.VHB = new Big(3000);
        }
        else {
            this.VHB = new Big(1900);
        }
        if (this.VSP2.cmp(this.VHB) == 1) {
            this.VSP2 = this.VHB;
        }
        this.VSPN = (this.VSP1.add(this.VSP2)).round(0, Big.roundUp);
        this.MVSP();
        if (this.VSPN.cmp(this.VSP) == 1) {
            this.VSP = this.VSPN.round(2, Big.roundDown);
        }
    };
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 5 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 28  */
    Lohnsteuer2024.prototype.MVSP = function () {
        if (this.ZRE4VP.cmp(this.BBGKVPV) == 1) {
            this.ZRE4VP = this.BBGKVPV;
        }
        if (this.PKV > 0) {
            if (this.STKL == 6) {
                this.VSP3 = this.Z_0;
            }
            else {
                this.VSP3 = this.PKPV.mul(this.ZAHL12).div(this.ZAHL100);
                if (this.PKV == 2) {
                    this.VSP3 = this.VSP3.sub(this.ZRE4VP.mul(this.KVSATZAG.add(this.PVSATZAG))).round(2, Big.roundDown);
                }
            }
        }
        else {
            this.VSP3 = this.ZRE4VP.mul(this.KVSATZAN.add(this.PVSATZAN)).round(2, Big.roundDown);
        }
        this.VSP = this.VSP3.add(this.VSP1).round(0, Big.roundUp);
    };
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 29  */
    Lohnsteuer2024.prototype.MST5_6 = function () {
        this.ZZX = this.X;
        if (this.ZZX.cmp(this.W2STKL5) == 1) {
            this.ZX = this.W2STKL5;
            this.UP5_6();
            if (this.ZZX.cmp(this.W3STKL5) == 1) {
                this.ST = (this.ST.add((this.W3STKL5.sub(this.W2STKL5)).mul(new Big(0.42)))).round(0, Big.roundDown);
                this.ST = (this.ST.add((this.ZZX.sub(this.W3STKL5)).mul(new Big(0.45)))).round(0, Big.roundDown);
            }
            else {
                this.ST = (this.ST.add((this.ZZX.sub(this.W2STKL5)).mul(new Big(0.42)))).round(0, Big.roundDown);
            }
        }
        else {
            this.ZX = this.ZZX;
            this.UP5_6();
            if (this.ZZX.cmp(this.W1STKL5) == 1) {
                this.VERGL = this.ST;
                this.ZX = this.W1STKL5;
                this.UP5_6();
                this.HOCH = (this.ST.add((this.ZZX.sub(this.W1STKL5)).mul(new Big(0.42)))).round(0, Big.roundDown); /**  Neuer Wert 2014  */
                if (this.HOCH.cmp(this.VERGL) == -1) {
                    this.ST = this.HOCH;
                }
                else {
                    this.ST = this.VERGL;
                }
            }
        }
    };
    /**  Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 30  */
    Lohnsteuer2024.prototype.UP5_6 = function () {
        this.X = (this.ZX.mul(new Big(1.25))).round(2, Big.roundDown);
        /**  Änderung für 2024  */
        this.UPTAB24();
        this.ST1 = this.ST;
        this.X = (this.ZX.mul(new Big(0.75))).round(2, Big.roundDown);
        /**  Änderung für 2024  */
        this.UPTAB24();
        this.ST2 = this.ST;
        this.DIFF = (this.ST1.sub(this.ST2)).mul(this.ZAHL2);
        this.MIST = (this.ZX.mul(new Big(0.14))).round(0, Big.roundDown);
        if (this.MIST.cmp(this.DIFF) == 1) {
            this.ST = this.MIST;
        }
        else {
            this.ST = this.DIFF;
        }
    };
    /**  Solidaritaetszuschlag, PAP Seite 31  */
    Lohnsteuer2024.prototype.MSOLZ = function () {
        this.SOLZFREI = (this.SOLZFREI.mul(new Big(this.KZTAB)));
        if (this.JBMG.cmp(this.SOLZFREI) == 1) {
            this.SOLZJ = (this.JBMG.mul(new Big(5.5))).div(this.ZAHL100).round(2, Big.roundDown);
            this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new Big(11.9)).div(this.ZAHL100).round(2, Big.roundDown); /**  Änderung für 2021  */
            if (this.SOLZMIN.cmp(this.SOLZJ) == -1) {
                this.SOLZJ = this.SOLZMIN;
            }
            this.JW = this.SOLZJ.mul(this.ZAHL100).round(0, Big.roundDown);
            this.UPANTEIL();
            this.SOLZLZZ = this.ANTEIL1;
        }
        else {
            this.SOLZLZZ = this.Z_0;
        }
        if (this.R > 0) {
            this.JW = this.JBMG.mul(this.ZAHL100);
            this.UPANTEIL();
            this.BK = this.ANTEIL1;
        }
        else {
            this.BK = this.Z_0;
        }
    };
    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 9 EStG), PAP Seite 32  */
    Lohnsteuer2024.prototype.UPANTEIL = function () {
        if (this.LZZ == 1) {
            this.ANTEIL1 = this.JW;
        }
        else {
            if (this.LZZ == 2) {
                this.ANTEIL1 = this.JW.div(this.ZAHL12).round(0, Big.roundDown);
            }
            else {
                if (this.LZZ == 3) {
                    this.ANTEIL1 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round(0, Big.roundDown);
                }
                else {
                    this.ANTEIL1 = this.JW.div(this.ZAHL360).round(0, Big.roundDown);
                }
            }
        }
    };
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 8 EStG), PAP Seite 33  */
    Lohnsteuer2024.prototype.MSONST = function () {
        this.LZZ = 1;
        if (this.ZMVB == 0) {
            this.ZMVB = 12;
        }
        if (this.SONSTB.cmp(this.Z_0) == 0 && this.MBV.cmp(this.Z_0) == 0) { /**  neu für 2022  */
            this.VKVSONST = this.Z_0;
            this.LSTSO = this.Z_0;
            this.STS = this.Z_0;
            this.SOLZS = this.Z_0;
            this.BKS = this.Z_0;
        }
        else {
            this.MOSONST();
            this.UPVKV();
            this.VKVSONST = this.VKV;
            this.ZRE4J = ((this.JRE4.add(this.SONSTB)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.ZVBEZJ = ((this.JVBEZ.add(this.VBS)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.VBEZBSO = this.STERBE;
            this.MRE4SONST();
            this.MLSTJAHR();
            this.WVFRBM = (this.ZVE.sub(this.GFB)).mul(this.ZAHL100).round(2, Big.roundDown);
            if (this.WVFRBM.cmp(this.Z_0) == -1) { /**  WVFRBM < 0  */
                this.WVFRBM = this.Z_0;
            }
            this.UPVKV();
            this.VKVSONST = this.VKV.sub(this.VKVSONST);
            this.LSTSO = this.ST.mul(this.ZAHL100);
            /**  lt. PAP:  "Hinweis: negative Zahlen werden nach ihrem Betrag gerundet!"  */
            /**  Fallunterscheidung bzgl. negativer Zahlen nicht nötig, da die Java-Klasse BigDecimal.ROUND_DOWN   */
            /**  die Ziffer und nicht die Zahl abrundet, also aus -4.5 wird -4 und aus 4.5 wird 4  */
            this.STS = this.LSTSO.sub(this.LSTOSO).mul(new Big(this.f)).div(this.ZAHL100).round(0, Big.roundDown).mul(this.ZAHL100);
            /**  Neu für 2022  */
            this.STSMIN();
        }
    };
    /**  Neu für 2022, PAP Seite 34  */
    Lohnsteuer2024.prototype.STSMIN = function () {
        if (this.STS.cmp(this.Z_0) == -1) { /**  STS < 0  */
            if (this.MBV.cmp(this.Z_0) == 0) { /**   MBV = 0   */
                /**  absichtlich leer  */
            }
            else {
                this.LSTLZZ = this.LSTLZZ.add(this.STS);
                if (this.LSTLZZ.cmp(this.Z_0) == -1) { /**   LSTLZZ < 0  */
                    this.LSTLZZ = this.Z_0;
                }
                this.SOLZLZZ = this.SOLZLZZ.add(this.STS.mul(new Big(5.5).div(this.ZAHL100))).round(0, Big.roundDown);
                if (this.SOLZLZZ.cmp(this.Z_0) == -1) { /**   SOLZLZZ < 0  */
                    this.SOLZLZZ = this.Z_0;
                }
                this.BK = this.BK.add(this.STS);
                if (this.BK.cmp(this.Z_0) == -1) { /**   BK < 0  */
                    this.BK = this.Z_0;
                }
            }
            this.STS = this.Z_0;
            this.SOLZS = this.Z_0;
        }
        else {
            this.MSOLZSTS();
        }
        if (this.R > 0) {
            this.BKS = this.STS;
        }
        else {
            this.BKS = this.Z_0;
        }
    };
    /**  Berechnung des SolZ auf sonstige Bezüge, PAP Seite 35, Neu ab 2021  */
    Lohnsteuer2024.prototype.MSOLZSTS = function () {
        if (this.ZKF.cmp(this.Z_0) == 1) { /**  ZKF > 0  */
            this.SOLZSZVE = this.ZVE.sub(this.KFB);
        }
        else {
            this.SOLZSZVE = this.ZVE;
        }
        if (this.SOLZSZVE.cmp(this.ZAHL1) == -1) { /**  SOLZSZVE < 1  */
            this.SOLZSZVE = this.Z_0;
            this.X = this.Z_0;
        }
        else {
            this.X = this.SOLZSZVE.div(new Big(this.KZTAB)).round(0, Big.roundDown);
        }
        if (this.STKL < 5) { /**  STKL < 5  */
            /**  Änderung für 2024  */
            this.UPTAB24();
        }
        else {
            this.MST5_6();
        }
        this.SOLZSBMG = this.ST.mul(new Big(this.f)).round(0, Big.roundDown);
        if (this.SOLZSBMG.cmp(this.SOLZFREI) == 1) { /**  SOLZSBMG > SOLZFREI  */
            this.SOLZS = this.STS.mul(new Big(5.5)).div(this.ZAHL100).round(0, Big.roundDown);
        }
        else {
            this.SOLZS = this.Z_0;
        }
    };
    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 und 10 EStG), PAP Seite 36  */
    Lohnsteuer2024.prototype.MVMT = function () {
        if (this.VKAPA.cmp(this.Z_0) == -1) {
            this.VKAPA = this.Z_0;
        }
        if ((this.VMT.add(this.VKAPA)).cmp(this.Z_0) == 1) {
            if (this.LSTSO.cmp(this.Z_0) == 0) {
                this.MOSONST();
                this.LST1 = this.LSTOSO;
            }
            else {
                this.LST1 = this.LSTSO;
            }
            this.VBEZBSO = this.STERBE.add(this.VKAPA);
            this.ZRE4J = ((this.JRE4.add(this.SONSTB).add(this.VMT).add(this.VKAPA)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.ZVBEZJ = ((this.JVBEZ.add(this.VBS).add(this.VKAPA)).div(this.ZAHL100)).round(2, Big.roundDown);
            this.KENNVMT = 2;
            this.MRE4SONST();
            this.MLSTJAHR();
            this.LST3 = this.ST.mul(this.ZAHL100);
            this.MRE4ABZ();
            this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
            this.KENNVMT = 1;
            this.MLSTJAHR();
            this.LST2 = this.ST.mul(this.ZAHL100);
            this.STV = this.LST2.sub(this.LST1);
            this.LST3 = this.LST3.sub(this.LST1);
            if (this.LST3.cmp(this.STV) == -1) {
                this.STV = this.LST3;
            }
            if (this.STV.cmp(this.Z_0) == -1) {
                this.STV = this.Z_0;
            }
            else {
                /**
                    lt. PAP muss hier auf ganze EUR abgerundet werden.
                Allerdings muss auch hier der Wert in Cent vorgehalten werden,
                    weshalb nach dem Aufrunden auf ganze EUR durch 'divide(ZAHL100, 0, BigDecimal.ROUND_DOWN)'
                    wieder die Multiplikation mit 100 erfolgt.
                 */
                this.STV = this.STV.mul(new Big(this.f)).div(this.ZAHL100).round(0, Big.roundDown).mul(this.ZAHL100);
            }
            /**  Beginn Neu 2021  */
            this.SOLZVBMG = this.STV.div(this.ZAHL100).round(0, Big.roundDown).add(this.JBMG);
            if (this.SOLZVBMG.cmp(this.SOLZFREI) == 1) { /**  SOLZVBMG > SOLZFREI  */
                this.SOLZV = this.STV.mul(new Big(5.5)).div(this.ZAHL100).round(0, Big.roundDown);
            }
            else {
                this.SOLZV = this.Z_0;
            }
            /**  Ende Neu 2021  */
            if (this.R > 0) {
                this.BKV = this.STV;
            }
            else {
                this.BKV = this.Z_0;
            }
        }
        else {
            this.STV = this.Z_0;
            this.SOLZV = this.Z_0;
            this.BKV = this.Z_0;
        }
    };
    /**  Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 37  */
    Lohnsteuer2024.prototype.MOSONST = function () {
        this.ZRE4J = (this.JRE4.div(this.ZAHL100)).round(2, Big.roundDown);
        this.ZVBEZJ = (this.JVBEZ.div(this.ZAHL100)).round(2, Big.roundDown);
        this.JLFREIB = this.JFREIB.div(this.ZAHL100).round(2, Big.roundDown);
        this.JLHINZU = this.JHINZU.div(this.ZAHL100).round(2, Big.roundDown);
        this.MRE4();
        this.MRE4ABZ();
        this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100));
        this.MZTABFB();
        this.VFRBS1 = ((this.ANP.add(this.FVB.add(this.FVBZ))).mul(this.ZAHL100)).round(2, Big.roundDown);
        this.MLSTJAHR();
        this.WVFRBO = ((this.ZVE.sub(this.GFB)).mul(this.ZAHL100)).round(2, Big.roundDown);
        if (this.WVFRBO.cmp(this.Z_0) == -1) {
            this.WVFRBO = this.Z_0;
        }
        this.LSTOSO = this.ST.mul(this.ZAHL100);
    };
    /**  Sonderberechnung mit sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 38  */
    Lohnsteuer2024.prototype.MRE4SONST = function () {
        this.MRE4();
        this.FVB = this.FVBSO;
        this.MRE4ABZ();
        /**  Änderung für 2022   */
        this.ZRE4VP = this.ZRE4VP.add(this.MBV.div(this.ZAHL100)).sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
        this.FVBZ = this.FVBZSO;
        this.MZTABFB();
        this.VFRBS2 = ((((this.ANP.add(this.FVB).add(this.FVBZ))).mul(this.ZAHL100))).sub(this.VFRBS1);
    };
    /**  Komplett Neu 2020  */
    /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 39  */
    Lohnsteuer2024.prototype.UPTAB24 = function () {
        if (this.X.cmp(this.GFB.add(this.ZAHL1)) == -1) {
            this.ST = this.Z_0;
        }
        else {
            if (this.X.cmp(new Big(17006)) == -1) { /**  Geändert für 2024  */
                this.Y = (this.X.sub(this.GFB)).div(this.ZAHL10000).round(6, Big.roundDown);
                this.RW = this.Y.mul(new Big(922.98)); /**  Geändert für 2024  */
                this.RW = this.RW.add(new Big(1400));
                this.ST = (this.RW.mul(this.Y)).round(0, Big.roundDown);
            }
            else {
                if (this.X.cmp(new Big(66761)) == -1) { /**  Geändert für 2024  */
                    this.Y = (this.X.sub(new Big(17005))).div(this.ZAHL10000).round(6, Big.roundDown); /**  Geändert für 2024   */
                    this.RW = this.Y.mul(new Big(181.19)); /**  Geändert für 2024  */
                    this.RW = this.RW.add(new Big(2397));
                    this.RW = this.RW.mul(this.Y);
                    this.ST = (this.RW.add(new Big(1025.38))).round(0, Big.roundDown); /**  Geändert für 2024  */
                }
                else {
                    if (this.X.cmp(new Big(277826)) == -1) { /**  Geändert für 2022  */
                        this.ST = ((this.X.mul(new Big(0.42))).sub(new Big(10602.13))).round(0, Big.roundDown); /**  Geändert für 2024  */
                    }
                    else {
                        this.ST = ((this.X.mul(new Big(0.45))).sub(new Big(18936.88))).round(0, Big.roundDown); /**  Geändert für 2024  */
                    }
                }
            }
        }
        this.ST = this.ST.mul(new Big(this.KZTAB));
    };
    /**
     * Getter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getAf = function () {
        return this.af;
    };
    /**
     * Setter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @param {number} af input value
     */
    Lohnsteuer2024.prototype.setAf = function (af) {
        this.af = af;
    };
    /**
     * Getter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getAJAHR = function () {
        return this.AJAHR;
    };
    /**
     * Setter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @param {number} AJAHR input value
     */
    Lohnsteuer2024.prototype.setAJAHR = function (AJAHR) {
        this.AJAHR = AJAHR;
    };
    /**
     * Getter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getALTER1 = function () {
        return this.ALTER1;
    };
    /**
     * Setter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @param {number} ALTER1 input value
     */
    Lohnsteuer2024.prototype.setALTER1 = function (ALTER1) {
        this.ALTER1 = ALTER1;
    };
    /**
     * Getter for ENTSCH.
     * <p>
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG
                 sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 4 EStG) in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getENTSCH = function () {
        return this.ENTSCH;
    };
    /**
     * Setter for ENTSCH.
     * <p>
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG
                 sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 4 EStG) in Cent
     * <p>
     * @param {Big} ENTSCH input value
     */
    Lohnsteuer2024.prototype.setENTSCH = function (ENTSCH) {
        this.ENTSCH = ENTSCH;
    };
    /**
     * Getter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getF = function () {
        return this.f;
    };
    /**
     * Setter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @param {number} f input value
     */
    Lohnsteuer2024.prototype.setF = function (f) {
        this.f = f;
    };
    /**
     * Getter for JFREIB.
     * <p>
     *  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2024 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getJFREIB = function () {
        return this.JFREIB;
    };
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2024 in Cent (ggf. 0)
     * <p>
     * @param {Big} JFREIB input value
     */
    Lohnsteuer2024.prototype.setJFREIB = function (JFREIB) {
        this.JFREIB = JFREIB;
    };
    /**
     * Getter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2024 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getJHINZU = function () {
        return this.JHINZU;
    };
    /**
     * Setter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2024 in Cent (ggf. 0)
     * <p>
     * @param {Big} JHINZU input value
     */
    Lohnsteuer2024.prototype.setJHINZU = function (JHINZU) {
        this.JHINZU = JHINZU;
    };
    /**
     * Getter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne Vergütung
                 für mehrjährige Tätigkeit und ohne die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                 § 19a Absatz 4 EStG) in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                 Bezügen (Felder SONSTB, VMT oder VKAPA).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                 so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                 besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG). Vergütungen für
                 mehrjährige Tätigkeit aus einem vorangegangenen Abrechnungszeitraum werden in voller
                 Höhe hinzugerechnet.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getJRE4 = function () {
        return this.JRE4;
    };
    /**
     * Setter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne Vergütung
                 für mehrjährige Tätigkeit und ohne die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                 § 19a Absatz 4 EStG) in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                 Bezügen (Felder SONSTB, VMT oder VKAPA).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                 so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                 besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG). Vergütungen für
                 mehrjährige Tätigkeit aus einem vorangegangenen Abrechnungszeitraum werden in voller
                 Höhe hinzugerechnet.
     * <p>
     * @param {Big} JRE4 input value
     */
    Lohnsteuer2024.prototype.setJRE4 = function (JRE4) {
        this.JRE4 = JRE4;
    };
    /**
     * Getter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getJVBEZ = function () {
        return this.JVBEZ;
    };
    /**
     * Setter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} JVBEZ input value
     */
    Lohnsteuer2024.prototype.setJVBEZ = function (JVBEZ) {
        this.JVBEZ = JVBEZ;
    };
    /**
     * Getter for KRV.
     * <p>
     * Merker für die Vorsorgepauschale
                2 = der Arbeitnehmer ist NICHT in der gesetzlichen Rentenversicherung versichert.
                
                1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze OST.
                    
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze WEST.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getKRV = function () {
        return this.KRV;
    };
    /**
     * Setter for KRV.
     * <p>
     * Merker für die Vorsorgepauschale
                2 = der Arbeitnehmer ist NICHT in der gesetzlichen Rentenversicherung versichert.
                
                1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze OST.
                    
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                    Beitragsbemessungsgrenze WEST.
     * <p>
     * @param {number} KRV input value
     */
    Lohnsteuer2024.prototype.setKRV = function (KRV) {
        this.KRV = KRV;
    };
    /**
     * Getter for KVZ.
     * <p>
     *  Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
             in Prozent (bspw. 1,70 für 1,70 %) mit 2 Dezimalstellen.
             Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
             anteil erfolgt im Programmablauf.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getKVZ = function () {
        return this.KVZ;
    };
    /**
     * Setter for KVZ.
     * <p>
     *  Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
             in Prozent (bspw. 1,70 für 1,70 %) mit 2 Dezimalstellen.
             Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
             anteil erfolgt im Programmablauf.
     * <p>
     * @param {Big} KVZ input value
     */
    Lohnsteuer2024.prototype.setKVZ = function (KVZ) {
        this.KVZ = KVZ;
    };
    /**
     * Getter for LZZ.
     * <p>
     *  Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getLZZ = function () {
        return this.LZZ;
    };
    /**
     * Setter for LZZ.
     * <p>
     *  Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag
     * <p>
     * @param {number} LZZ input value
     */
    Lohnsteuer2024.prototype.setLZZ = function (LZZ) {
        this.LZZ = LZZ;
    };
    /**
     * Getter for LZZFREIB.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2024 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getLZZFREIB = function () {
        return this.LZZFREIB;
    };
    /**
     * Setter for LZZFREIB.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2024 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZFREIB input value
     */
    Lohnsteuer2024.prototype.setLZZFREIB = function (LZZFREIB) {
        this.LZZFREIB = LZZFREIB;
    };
    /**
     * Getter for LZZHINZU.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2024 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getLZZHINZU = function () {
        return this.LZZHINZU;
    };
    /**
     * Setter for LZZHINZU.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2024 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZHINZU input value
     */
    Lohnsteuer2024.prototype.setLZZHINZU = function (LZZHINZU) {
        this.LZZHINZU = LZZHINZU;
    };
    /**
     * Getter for MBV.
     * <p>
     *  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getMBV = function () {
        return this.MBV;
    };
    /**
     * Setter for MBV.
     * <p>
     *  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent
     * <p>
     * @param {Big} MBV input value
     */
    Lohnsteuer2024.prototype.setMBV = function (MBV) {
        this.MBV = MBV;
    };
    /**
     * Getter for PKPV.
     * <p>
     *  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben).
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getPKPV = function () {
        return this.PKPV;
    };
    /**
     * Setter for PKPV.
     * <p>
     *  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben).
     * <p>
     * @param {Big} PKPV input value
     */
    Lohnsteuer2024.prototype.setPKPV = function (PKPV) {
        this.PKPV = PKPV;
    };
    /**
     * Getter for PKV.
     * <p>
     *  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getPKV = function () {
        return this.PKV;
    };
    /**
     * Setter for PKV.
     * <p>
     *  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss
     * <p>
     * @param {number} PKV input value
     */
    Lohnsteuer2024.prototype.setPKV = function (PKV) {
        this.PKV = PKV;
    };
    /**
     * Getter for PVA.
     * <p>
     *  Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                 bei mehr als einem Kind
                 0 = kein Abschlag
                 1 = Beitragsabschlag für das 2. Kind
                 2 = Beitragsabschläge für das 2. und 3. Kind
                 3 = Beitragsabschläge für 2. bis 4. Kinder
                 4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getPVA = function () {
        return this.PVA;
    };
    /**
     * Setter for PVA.
     * <p>
     *  Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                 bei mehr als einem Kind
                 0 = kein Abschlag
                 1 = Beitragsabschlag für das 2. Kind
                 2 = Beitragsabschläge für das 2. und 3. Kind
                 3 = Beitragsabschläge für 2. bis 4. Kinder
                 4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
     * <p>
     * @param {Big} PVA input value
     */
    Lohnsteuer2024.prototype.setPVA = function (PVA) {
        this.PVA = PVA;
    };
    /**
     * Getter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getPVS = function () {
        return this.PVS;
    };
    /**
     * Setter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.
     * <p>
     * @param {number} PVS input value
     */
    Lohnsteuer2024.prototype.setPVS = function (PVS) {
        this.PVS = PVS;
    };
    /**
     * Getter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getPVZ = function () {
        return this.PVZ;
    };
    /**
     * Setter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.
     * <p>
     * @param {number} PVZ input value
     */
    Lohnsteuer2024.prototype.setPVZ = function (PVZ) {
        this.PVZ = PVZ;
    };
    /**
     * Getter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                 Bescheinigung für den Lohnsteuerabzug 2024 (bei keiner Religionszugehörigkeit = 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getR = function () {
        return this.R;
    };
    /**
     * Setter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                 Bescheinigung für den Lohnsteuerabzug 2024 (bei keiner Religionszugehörigkeit = 0)
     * <p>
     * @param {number} R input value
     */
    Lohnsteuer2024.prototype.setR = function (R) {
        this.R = R;
    };
    /**
     * Getter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2024 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getRE4 = function () {
        return this.RE4;
    };
    /**
     * Setter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2024 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent
     * <p>
     * @param {Big} RE4 input value
     */
    Lohnsteuer2024.prototype.setRE4 = function (RE4) {
        this.RE4 = RE4;
    };
    /**
     * Getter for SONSTB.
     * <p>
     *  Sonstige Bezüge (ohne Vergütung aus mehrjähriger Tätigkeit) einschließlich nicht tarifermäßigt
                 zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                 Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt,
                 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSONSTB = function () {
        return this.SONSTB;
    };
    /**
     * Setter for SONSTB.
     * <p>
     *  Sonstige Bezüge (ohne Vergütung aus mehrjähriger Tätigkeit) einschließlich nicht tarifermäßigt
                 zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                 Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt,
                 in Cent (ggf. 0)
     * <p>
     * @param {Big} SONSTB input value
     */
    Lohnsteuer2024.prototype.setSONSTB = function (SONSTB) {
        this.SONSTB = SONSTB;
    };
    /**
     * Getter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
                 (in SONSTB enthalten) in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSTERBE = function () {
        return this.STERBE;
    };
    /**
     * Setter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
                 (in SONSTB enthalten) in Cents
     * <p>
     * @param {Big} STERBE input value
     */
    Lohnsteuer2024.prototype.setSTERBE = function (STERBE) {
        this.STERBE = STERBE;
    };
    /**
     * Getter for STKL.
     * <p>
     *  Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSTKL = function () {
        return this.STKL;
    };
    /**
     * Setter for STKL.
     * <p>
     *  Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI
     * <p>
     * @param {number} STKL input value
     */
    Lohnsteuer2024.prototype.setSTKL = function (STKL) {
        this.STKL = STKL;
    };
    /**
     * Getter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVBEZ = function () {
        return this.VBEZ;
    };
    /**
     * Setter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} VBEZ input value
     */
    Lohnsteuer2024.prototype.setVBEZ = function (VBEZ) {
        this.VBEZ = VBEZ;
    };
    /**
     * Getter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
                 in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVBEZM = function () {
        return this.VBEZM;
    };
    /**
     * Setter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
                 in Cents
     * <p>
     * @param {Big} VBEZM input value
     */
    Lohnsteuer2024.prototype.setVBEZM = function (VBEZM) {
        this.VBEZM = VBEZM;
    };
    /**
     * Getter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
                 bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
                 bei Versorgungsbezuegen in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVBEZS = function () {
        return this.VBEZS;
    };
    /**
     * Setter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
                 bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
                 bei Versorgungsbezuegen in Cents
     * <p>
     * @param {Big} VBEZS input value
     */
    Lohnsteuer2024.prototype.setVBEZS = function (VBEZS) {
        this.VBEZS = VBEZS;
    };
    /**
     * Getter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVBS = function () {
        return this.VBS;
    };
    /**
     * Setter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
     * <p>
     * @param {Big} VBS input value
     */
    Lohnsteuer2024.prototype.setVBS = function (VBS) {
        this.VBS = VBS;
    };
    /**
     * Getter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
                 mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVJAHR = function () {
        return this.VJAHR;
    };
    /**
     * Setter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
                 mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
     * <p>
     * @param {number} VJAHR input value
     */
    Lohnsteuer2024.prototype.setVJAHR = function (VJAHR) {
        this.VJAHR = VJAHR;
    };
    /**
     * Getter for VKAPA.
     * <p>
     *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
                 für mehrere Jahre in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVKAPA = function () {
        return this.VKAPA;
    };
    /**
     * Setter for VKAPA.
     * <p>
     *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
                 für mehrere Jahre in Cent (ggf. 0)
     * <p>
     * @param {Big} VKAPA input value
     */
    Lohnsteuer2024.prototype.setVKAPA = function (VKAPA) {
        this.VKAPA = VKAPA;
    };
    /**
     * Getter for VMT.
     * <p>
     *  Entschädigungen und Vergütung für mehrjährige Tätigkeit sowie tarifermäßigt
                 zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 Satz 2 EStG)
                 ohne Kapitalauszahlungen und ohne Abfindungen bei Versorgungsbezügen
                 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVMT = function () {
        return this.VMT;
    };
    /**
     * Setter for VMT.
     * <p>
     *  Entschädigungen und Vergütung für mehrjährige Tätigkeit sowie tarifermäßigt
                 zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 Satz 2 EStG)
                 ohne Kapitalauszahlungen und ohne Abfindungen bei Versorgungsbezügen
                 in Cent (ggf. 0)
     * <p>
     * @param {Big} VMT input value
     */
    Lohnsteuer2024.prototype.setVMT = function (VMT) {
        this.VMT = VMT;
    };
    /**
     * Getter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getZKF = function () {
        return this.ZKF;
    };
    /**
     * Setter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
     * <p>
     * @param {Big} ZKF input value
     */
    Lohnsteuer2024.prototype.setZKF = function (ZKF) {
        this.ZKF = ZKF;
    };
    /**
     * Getter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
                 erforderlich bei Jahresberechnung (LZZ = 1)
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getZMVB = function () {
        return this.ZMVB;
    };
    /**
     * Setter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
                 erforderlich bei Jahresberechnung (LZZ = 1)
     * <p>
     * @param {number} ZMVB input value
     */
    Lohnsteuer2024.prototype.setZMVB = function (ZMVB) {
        this.ZMVB = ZMVB;
    };
    /**
     * Getter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getJRE4ENT = function () {
        return this.JRE4ENT;
    };
    /**
     * Setter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent
     * <p>
     * @param {Big} JRE4ENT input value
     */
    Lohnsteuer2024.prototype.setJRE4ENT = function (JRE4ENT) {
        this.JRE4ENT = JRE4ENT;
    };
    /**
     * Getter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht
                 tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSONSTENT = function () {
        return this.SONSTENT;
    };
    /**
     * Setter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht
                 tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @param {Big} SONSTENT input value
     */
    Lohnsteuer2024.prototype.setSONSTENT = function (SONSTENT) {
        this.SONSTENT = SONSTENT;
    };
    /**
     * Getter for BK.
     * <p>
     *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getBK = function () {
        return this.BK;
    };
    /**
     * Getter for BKS.
     * <p>
     *  Bemessungsgrundlage der sonstigen Bezüge (ohne Vergütung für mehrjährige Tätigkeit)
                 für die Kirchenlohnsteuer in Cent.
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                 Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
                 (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
                 im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getBKS = function () {
        return this.BKS;
    };
    /**
     * Getter for BKV.
     * <p>
     *  Bemessungsgrundlage der Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
                 zu besteuernden Vorteile bei Vermögensbeteiligungen für die Kirchenlohnsteuer in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getBKV = function () {
        return this.BKV;
    };
    /**
     * Getter for LSTLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getLSTLZZ = function () {
        return this.LSTLZZ;
    };
    /**
     * Getter for SOLZLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
                 in Cents
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSOLZLZZ = function () {
        return this.SOLZLZZ;
    };
    /**
     * Getter for SOLZS.
     * <p>
     *  Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit in Cent.
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern SOLZLZZ (maximal bis 0). Der
                 Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                 Veranlagung zur Einkommensteuer bleibt unberührt.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSOLZS = function () {
        return this.SOLZS;
    };
    /**
     * Getter for SOLZV.
     * <p>
     *  Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
                 zu besteuernden Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSOLZV = function () {
        return this.SOLZV;
    };
    /**
     * Getter for STS.
     * <p>
     *  Lohnsteuer für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit und ohne
                 tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen) in Cent
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
                 Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                 Veranlagung zur Einkommensteuer bleibt unberührt.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSTS = function () {
        return this.STS;
    };
    /**
     * Getter for STV.
     * <p>
     *  Lohnsteuer für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt zu besteuernden
                 Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getSTV = function () {
        return this.STV;
    };
    /**
     * Getter for VKVLZZ.
     * <p>
     *  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
                 privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
                 die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
                 steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
                 steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
                 VKVSONST
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVKVLZZ = function () {
        return this.VKVLZZ;
    };
    /**
     * Getter for VKVSONST.
     * <p>
     *  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
                 zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
                 auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
                 auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen für mehrjährige
                 Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVKVSONST = function () {
        return this.VKVSONST;
    };
    /**
     * Getter for VFRB.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVFRB = function () {
        return this.VFRB;
    };
    /**
     * Getter for VFRBS1.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVFRBS1 = function () {
        return this.VFRBS1;
    };
    /**
     * Getter for VFRBS2.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getVFRBS2 = function () {
        return this.VFRBS2;
    };
    /**
     * Getter for WVFRB.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
                dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getWVFRB = function () {
        return this.WVFRB;
    };
    /**
     * Getter for WVFRBO.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
                bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getWVFRBO = function () {
        return this.WVFRBO;
    };
    /**
     * Getter for WVFRBM.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
                über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent
     * <p>
     * @return the value
     */
    Lohnsteuer2024.prototype.getWVFRBM = function () {
        return this.WVFRBM;
    };
    /**
     * Initialize all inputs values with zero.
     */
    Lohnsteuer2024.prototype.initInputs = function () {
        this.ENTSCH = this.JFREIB = this.JHINZU = this.JRE4 = this.JVBEZ = this.KVZ = this.LZZFREIB = this.LZZHINZU = this.MBV = this.PKPV = this.PVA = this.RE4 = this.SONSTB = this.STERBE = this.VBEZ = this.VBEZM = this.VBEZS = this.VBS = this.VKAPA = this.VMT = this.ZKF = this.JRE4ENT = this.SONSTENT = this.Z_0;
        this.af = this.AJAHR = this.ALTER1 = this.f = this.KRV = this.LZZ = this.PKV = this.PVS = this.PVZ = this.R = this.STKL = this.VJAHR = this.ZMVB = 0;
    };
    // not realy clean, but for ts compiler
    Lohnsteuer2024.prototype.isBigInput = function (name, value) {
        return value instanceof Big;
    };
    /**
     * Setter for Big or number input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {number} value Value to set.
     */
    Lohnsteuer2024.prototype.set = function (name, value) {
        if (!this.hasOwnProperty(name)) {
            throw new Error("Unknown parameter " + name);
        }
        if (this.isBigInput(name, value)) {
            if (value instanceof Big) {
                this[name] = value;
            }
        }
        else if (!(value instanceof Big)) {
            this[name] = value;
        }
    };
    /**
     * Getter for all output parameters. You get a value of type "number or "Big".
     *
     * @param {string} name Variable name to get.
     */
    Lohnsteuer2024.prototype.get = function (name) {
        if (this.hasOwnProperty(name)) {
            return this[name];
        }
        throw new Error("Unknown parameter " + name);
    };
    /**
     * Get all fields with types.
     */
    Lohnsteuer2024.prototype.getDirectory = function () {
        return Lohnsteuer2024.typeDirectory;
    };
    /**
     * Converts a value (number or Big) in the correct type (number or Big).
     *
     * @param {string} name the name of the value
     * @param {TaxJsValueType} value the value to convert
     */
    Lohnsteuer2024.prototype.toType = function (name, value) {
        var info = Lohnsteuer2024.typeDirectory[name];
        if (!info) {
            throw new Error("Unknown parameter " + name);
        }
        if (typeof value == "number" && info.type != "number") {
            return new Big(value);
        }
        if (typeof value == "object" && info.type == "number") {
            return value.toNumber();
        }
        return value;
    };
    Lohnsteuer2024._n = "number";
    Lohnsteuer2024._b = "Big";
    Lohnsteuer2024._i = "input";
    Lohnsteuer2024._o = "output";
    Lohnsteuer2024._s = "STANDARD";
    Lohnsteuer2024._d = "DBA";
    Lohnsteuer2024.typeDirectory = {
        "af": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "AJAHR": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "ALTER1": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "ENTSCH": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "f": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "JFREIB": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "JHINZU": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "JRE4": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "JVBEZ": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "KRV": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "KVZ": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "LZZ": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "LZZFREIB": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "LZZHINZU": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "MBV": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "PKPV": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "PKV": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "PVA": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "PVS": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "PVZ": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "R": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "RE4": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "SONSTB": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "STERBE": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "STKL": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "VBEZ": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "VBEZM": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "VBEZS": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "VBS": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "VJAHR": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "VKAPA": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "VMT": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "ZKF": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "ZMVB": { type: Lohnsteuer2024._n, direction: Lohnsteuer2024._i }, "JRE4ENT": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "SONSTENT": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._i }, "BK": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "BKS": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "BKV": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "LSTLZZ": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "SOLZLZZ": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "SOLZS": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "SOLZV": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "STS": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "STV": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "VKVLZZ": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "VKVSONST": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._s }, "VFRB": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._d }, "VFRBS1": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._d }, "VFRBS2": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._d }, "WVFRB": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._d }, "WVFRBO": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._d }, "WVFRBM": { type: Lohnsteuer2024._b, direction: Lohnsteuer2024._o, group: Lohnsteuer2024._d },
    };
    return Lohnsteuer2024;
}());
//# sourceMappingURL=Lohnsteuer2024Big.js.map