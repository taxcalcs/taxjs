import Big from 'big.js';
import { TaxJs, TaxJsValueType, TaxJsDictionary } from '../../TaxJs';
type Lohnsteuer2023JanuarBigInBigType = "ENTSCH" | "JFREIB" | "JHINZU" | "JRE4" | "JVBEZ" | "KVZ" | "LZZFREIB" | "LZZHINZU" | "MBV" | "PKPV" | "RE4" | "SONSTB" | "STERBE" | "VBEZ" | "VBEZM" | "VBEZS" | "VBS" | "VKAPA" | "VMT" | "ZKF" | "JRE4ENT" | "SONSTENT";
type Lohnsteuer2023JanuarBigInNumberType = "af" | "AJAHR" | "ALTER1" | "f" | "KRV" | "LZZ" | "PKV" | "PVS" | "PVZ" | "R" | "STKL" | "VJAHR" | "ZMVB";
type Lohnsteuer2023JanuarBigOutType = "BK" | "BKS" | "BKV" | "LSTLZZ" | "SOLZLZZ" | "SOLZS" | "SOLZV" | "STS" | "STV" | "VKVLZZ" | "VKVSONST" | "VFRB" | "VFRBS1" | "VFRBS2" | "WVFRB" | "WVFRBO" | "WVFRBM";
/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
export declare class Lohnsteuer2023JanuarBig implements TaxJs<Lohnsteuer2023JanuarBigInBigType, Lohnsteuer2023JanuarBigInNumberType, Lohnsteuer2023JanuarBigOutType> {
    private static readonly _n;
    private static readonly _b;
    private static readonly _i;
    private static readonly _o;
    private static readonly _s;
    private static readonly _d;
    private readonly Z_0;
    private readonly Z_1;
    private readonly Z_10;
    /**  Stand: 2023-01-04 09:40 */
    /**  ITZBund Berlin  */
    /**   EINGABEPARAMETER   */
    /**  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)  */
    private af;
    /**  Auf die Vollendung des 64. Lebensjahres folgende
         Kalenderjahr (erforderlich, wenn ALTER1=1)  */
    private AJAHR;
    /**  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
         der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0  */
    private ALTER1;
    /**  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG
         sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen
         (§ 19a Absatz 4 EStG) in Cent  */
    private ENTSCH;
    /**  eingetragener Faktor mit drei Nachkommastellen  */
    private f;
    /**  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
         sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
         elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
         auf der Bescheinigung für den Lohnsteuerabzug 2023 in Cent (ggf. 0)  */
    private JFREIB;
    /**  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
         sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
         elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
         Bescheinigung für den Lohnsteuerabzug 2023 in Cent (ggf. 0)  */
    private JHINZU;
    /**  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne Vergütung
         für mehrjährige Tätigkeit und ohne die zu besteuernden Vorteile bei Vermögensbeteiligungen,
         § 19a Absatz 4 EStG) in Cent.
         Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
         Bezügen (Felder SONSTB, VMT oder VKAPA).
         Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
         so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
         besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG). Vergütungen für
         mehrjährige Tätigkeit aus einem vorangegangenen Abrechnungszeitraum werden in voller
         Höhe hinzugerechnet. */
    private JRE4;
    /**  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
    private JVBEZ;
    /** Merker für die Vorsorgepauschale
        2 = der Arbeitnehmer ist NICHT in der gesetzlichen Rentenversicherung versichert.
        
        1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
            Beitragsbemessungsgrenze OST.
            
        0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
            Beitragsbemessungsgrenze WEST.  */
    private KRV;
    /**  Einkommensbezogener Zusatzbeitragssatz eines gesetzlich krankenversicherten Arbeitnehmers,
     auf dessen Basis der an die Krankenkasse zu zahlende Zusatzbeitrag berechnet wird,
     in Prozent (bspw. 0,90 für 0,90 %) mit 2 Dezimalstellen.
     Der von der Kranken-kasse festgesetzte Zusatzbeitragssatz ist bei Abweichungen unmaßgeblich.  */
    private KVZ;
    /**  Lohnzahlungszeitraum:
         1 = Jahr
         2 = Monat
         3 = Woche
         4 = Tag  */
    private LZZ;
    /**  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
         oder in der Bescheinigung für den Lohnsteuerabzug 2023 eingetragene Freibetrag für den
         Lohnzahlungszeitraum in Cent  */
    private LZZFREIB;
    /**  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
         oder in der Bescheinigung für den Lohnsteuerabzug 2023 eingetragene Hinzurechnungsbetrag für den
         Lohnzahlungszeitraum in Cent  */
    private LZZHINZU;
    /**  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
         (§ 19a Absatz 1 Satz 4 EStG) in Cent  */
    private MBV;
    /**  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
         Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
         als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
         als Monatsbetrag anzugeben). */
    private PKPV;
    /**  Krankenversicherung:
         0 = gesetzlich krankenversicherte Arbeitnehmer
         1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
         2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss  */
    private PKV;
    /**  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
            zu berücksichtigen wären, sonst 0.  */
    private PVS;
    /**  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
            zu zahlen hat, sonst 0.  */
    private PVZ;
    /**  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
         Bescheinigung für den Lohnsteuerabzug 2023 (bei keiner Religionszugehörigkeit = 0)  */
    private R;
    /**  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
         Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
         und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
         den Lohnsteuerabzug 2023 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
         Hinzurechnungsbetrags in Cent  */
    private RE4;
    /**  Sonstige Bezüge (ohne Vergütung aus mehrjähriger Tätigkeit) einschließlich nicht tarifermäßigt
         zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
         Kapitalauszahlungen/Abfindungen, soweit es sich nicht um Bezüge für mehrere Jahre handelt,
         in Cent (ggf. 0)  */
    private SONSTB;
    /**  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
         soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
         (in SONSTB enthalten) in Cents  */
    private STERBE;
    /**  Steuerklasse:
         1 = I
         2 = II
         3 = III
         4 = IV
         5 = V
         6 = VI  */
    private STKL;
    /**  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
    private VBEZ;
    /**  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
         in Cents */
    private VBEZM;
    /**  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
         bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
         bei Versorgungsbezuegen in Cents */
    private VBEZS;
    /**  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
        in Cents (ggf. 0)  */
    private VBS;
    /**  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
         mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug  */
    private VJAHR;
    /**  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
         für mehrere Jahre in Cent (ggf. 0)  */
    private VKAPA;
    /**  Entschädigungen und Vergütung für mehrjährige Tätigkeit sowie tarifermäßigt
         zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 Satz 2 EStG)
         ohne Kapitalauszahlungen und ohne Abfindungen bei Versorgungsbezügen
         in Cent (ggf. 0)  */
    private VMT;
    /**  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
         I, II, III und IV)  */
    private ZKF;
    /**  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
         erforderlich bei Jahresberechnung (LZZ = 1)  */
    private ZMVB;
    /**  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
         Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent  */
    private JRE4ENT;
    /**  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht
         tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent  */
    private SONSTENT;
    /**   AUSGABEPARAMETER   */
    /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
    private BK;
    /**  Bemessungsgrundlage der sonstigen Bezüge (ohne Vergütung für mehrjährige Tätigkeit)
         für die Kirchenlohnsteuer in Cent.
         Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
         Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
         (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
         im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.  */
    private BKS;
    /**  Bemessungsgrundlage der Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
         zu besteuernden Vorteile bei Vermögensbeteiligungen für die Kirchenlohnsteuer in Cent   */
    private BKV;
    /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
    private LSTLZZ;
    /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
         in Cents  */
    private SOLZLZZ;
    /**  Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit in Cent.
         Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
         (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern SOLZLZZ (maximal bis 0). Der
         Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
         Veranlagung zur Einkommensteuer bleibt unberührt.  */
    private SOLZS;
    /**  Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
         zu besteuernden Vorteile bei Vermögensbeteiligungen in Cent  */
    private SOLZV;
    /**  Lohnsteuer für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit und ohne
         tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen) in Cent
         Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
         (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
         Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
         Veranlagung zur Einkommensteuer bleibt unberührt.  */
    private STS;
    /**  Lohnsteuer für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt zu besteuernden
         Vorteile bei Vermögensbeteiligungen in Cent  */
    private STV;
    /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
         privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
         die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
         steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
         steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
         VKVSONST  */
    private VKVLZZ;
    /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
         zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
         auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
         auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen für mehrjährige
         Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.  */
    private VKVSONST;
    /**   AUSGABEPARAMETER DBA   */
    /**  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent  */
    private VFRB;
    /**  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
    private VFRBS1;
    /**  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent  */
    private VFRBS2;
    /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
        dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent  */
    private WVFRB;
    /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
        bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
    private WVFRBO;
    /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
        über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent  */
    private WVFRBM;
    /**   INTERNE FELDER   */
    /**  Altersentlastungsbetrag nach Alterseinkünftegesetz in €,
         Cent (2 Dezimalstellen)  */
    private ALTE;
    /**  Arbeitnehmer-Pauschbetrag in EURO  */
    private ANP;
    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
         auf ganze Cents abgerundet  */
    private ANTEIL1;
    /**  Bemessungsgrundlage für Altersentlastungsbetrag in €, Cent
         (2 Dezimalstellen)  */
    private BMG;
    /**  Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung
        und der sozialen Pflegeversicherung in Euro  */
    private BBGKVPV;
    /**   Nach Programmablaufplan 2019  */
    private bd;
    /**  allgemeine Beitragsbemessungsgrenze in der allgemeinen Renten-versicherung in Euro  */
    private BBGRV;
    /**  Differenz zwischen ST1 und ST2 in EURO  */
    private DIFF;
    /**  Entlastungsbetrag für Alleinerziehende in Euro  */
    private EFA;
    /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen)  */
    private FVB;
    /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen) für die Berechnung
         der Lohnsteuer für den sonstigen Bezug  */
    private FVBSO;
    /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
    private FVBZ;
    /**  Zuschlag zum Versorgungsfreibetrag in EURO fuer die Berechnung
         der Lohnsteuer beim sonstigen Bezug  */
    private FVBZSO;
    /**  Grundfreibetrag in Euro  */
    private GFB;
    /**  Maximaler Altersentlastungsbetrag in €  */
    private HBALTE;
    /**  Massgeblicher maximaler Versorgungsfreibetrag in €  */
    private HFVB;
    /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €,Cent
         (2 Dezimalstellen)  */
    private HFVBZ;
    /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €, Cent
         (2 Dezimalstellen) für die Berechnung der Lohnsteuer für den
         sonstigen Bezug  */
    private HFVBZSO;
    /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
    private J;
    /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
         Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
    private JBMG;
    /**  Auf einen Jahreslohn hochgerechneter LZZFREIB in €, Cent
         (2 Dezimalstellen)  */
    private JLFREIB;
    /**  Auf einen Jahreslohn hochgerechnete LZZHINZU in €, Cent
         (2 Dezimalstellen)  */
    private JLHINZU;
    /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
         UPANTEIL errechnet werden soll in Cents  */
    private JW;
    /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
    private K;
    /**  Merker für Berechnung Lohnsteuer für mehrjährige Tätigkeit.
         0 = normale Steuerberechnung
         1 = Steuerberechnung für mehrjährige Tätigkeit
         2 = entfällt  */
    private KENNVMT;
    /**  Summe der Freibetraege fuer Kinder in EURO  */
    private KFB;
    /**  Beitragssatz des Arbeitgebers zur Krankenversicherung  */
    private KVSATZAG;
    /**  Beitragssatz des Arbeitnehmers zur Krankenversicherung  */
    private KVSATZAN;
    /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
          1 = Grundtabelle
          2 = Splittingtabelle  */
    private KZTAB;
    /**  Jahreslohnsteuer in EURO  */
    private LSTJAHR;
    /**  Zwischenfelder der Jahreslohnsteuer in Cent  */
    private LST1;
    private LST2;
    private LST3;
    private LSTOSO;
    private LSTSO;
    /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
    private MIST;
    /**  Beitragssatz des Arbeitgebers zur Pflegeversicherung  */
    private PVSATZAG;
    /**  Beitragssatz des Arbeitnehmers zur Pflegeversicherung  */
    private PVSATZAN;
    /**  Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)   */
    private RVSATZAN;
    /**  Rechenwert in Gleitkommadarstellung  */
    private RW;
    /**  Sonderausgaben-Pauschbetrag in EURO  */
    private SAP;
    /**  Freigrenze fuer den Solidaritaetszuschlag in EURO  */
    private SOLZFREI;
    /**  Solidaritaetszuschlag auf die Jahreslohnsteuer in EURO, C (2 Dezimalstellen)  */
    private SOLZJ;
    /**  Zwischenwert fuer den Solidaritaetszuschlag auf die Jahreslohnsteuer
         in EURO, C (2 Dezimalstellen)  */
    private SOLZMIN;
    /**  Neu ab 2021: Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Euro  */
    private SOLZSBMG;
    /**  Neu ab 2021: Zu versteuerndes Einkommen für die Ermittlung der Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Euro, Cent (2 Dezimalstellen)  */
    private SOLZSZVE;
    /**  Neu ab 2021: Bemessungsgrundlage des Solidaritätszuschlags für die Prüfung der Freigrenze beim Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit in Euro  */
    private SOLZVBMG;
    /**  Tarifliche Einkommensteuer in EURO  */
    private ST;
    /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in EURO  */
    private ST1;
    /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in EURO  */
    private ST2;
    /**  Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehrjährige Tätigkeit  */
    private STOVMT;
    /**  Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)  */
    private TBSVORV;
    /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
    private VBEZB;
    /**  Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für
         den sonstigen Bezug  */
    private VBEZBSO;
    /**  Hoechstbetrag der Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
    private VHB;
    /**  Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
    private VSP;
    /**  Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
    private VSPN;
    /**  Zwischenwert 1 bei der Berechnung der Vorsorgepauschale nach
         dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
    private VSP1;
    /**  Zwischenwert 2 bei der Berechnung der Vorsorgepauschale nach
         dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
    private VSP2;
    /**  Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und
         soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die
         private Basiskrankenversicherung und private Pflege-Pflichtversicherung
         in Euro, Cent (2 Dezimalstellen)  */
    private VSP3;
    /**  Erster Grenzwert in Steuerklasse V/VI in Euro  */
    private W1STKL5;
    /**  Zweiter Grenzwert in Steuerklasse V/VI in Euro  */
    private W2STKL5;
    /**  Dritter Grenzwert in Steuerklasse V/VI in Euro  */
    private W3STKL5;
    /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 2 EStG in EURO  */
    private VSPMAX1;
    /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 3 EStG in EURO  */
    private VSPMAX2;
    /**  Vorsorgepauschale nach § 10c Abs. 2 Satz 2 EStG vor der Hoechstbetragsberechnung
         in EURO, C (2 Dezimalstellen)  */
    private VSPO;
    /**  Fuer den Abzug nach § 10c Abs. 2 Nrn. 2 und 3 EStG verbleibender
         Rest von VSPO in EURO, C (2 Dezimalstellen)  */
    private VSPREST;
    /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 1 EStG
         in EURO, C (2 Dezimalstellen)  */
    private VSPVOR;
    /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG €, C
         (2 Dezimalstellen)  */
    private X;
    /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
    private Y;
    /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
         nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4.  */
    private ZRE4;
    /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)  */
    private ZRE4J;
    /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
         nach Abzug des Versorgungsfreibetrags und des Alterentlastungsbetrags
         zur Berechnung der Vorsorgepauschale in €, Cent (2 Dezimalstellen)  */
    private ZRE4VP;
    /**  Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in €, Cent
         (2 Dezimalstellen)  */
    private ZTABFB;
    /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
         EURO, C (2 Dezimalstellen)  */
    private ZVBEZ;
    /**  Auf einen Jahreslohn hochgerechnetes VBEZ in €, C (2 Dezimalstellen)  */
    private ZVBEZJ;
    /**  Zu versteuerndes Einkommen in €, C (2 Dezimalstellen)  */
    private ZVE;
    /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
         Abs. 2 Satz 7 EStG in €  */
    private ZX;
    private ZZX;
    private HOCH;
    private VERGL;
    /**  Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und
         privaten Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale) in Cent.  */
    private VKV;
    /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
    private readonly TAB1;
    /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
    private readonly TAB2;
    /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
    private readonly TAB3;
    /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
    private readonly TAB4;
    /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
    private readonly TAB5;
    /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
    private readonly ZAHL1;
    private readonly ZAHL2;
    private readonly ZAHL5;
    private readonly ZAHL7;
    private readonly ZAHL12;
    private readonly ZAHL100;
    private readonly ZAHL360;
    private readonly ZAHL500;
    private readonly ZAHL700;
    private readonly ZAHL1000;
    private readonly ZAHL10000;
    /**  PROGRAMMABLAUFPLAN, PAP Seite 14  */
    calculate(): void;
    /**  Zuweisung von Werten für bestimmte Sozialversicherungsparameter  PAP Seite 15  */
    private MPARA;
    /**  Ermittlung des Jahresarbeitslohns nach § 39 b Abs. 2 Satz 2 EStG, PAP Seite 16  */
    private MRE4JL;
    /**  Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 17  */
    private MRE4;
    /**  Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 18  */
    private MRE4ALTE;
    /**  Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 20  */
    private MRE4ABZ;
    /**  Berechnung fuer laufende Lohnzahlungszeitraueme Seite 21 */
    private MBERECH;
    /**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 22  */
    private MZTABFB;
    /**  Ermittlung Jahreslohnsteuer, PAP Seite 23  */
    private MLSTJAHR;
    /**  PAP Seite 24  */
    private UPVKVLZZ;
    /**  PAP Seite 24  */
    private UPVKV;
    /**  PAP Seite 25  */
    private UPLSTLZZ;
    /**  Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif. PAP Seite 26  */
    private UPMLST;
    /**  	Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG) PAP Seite 27   */
    private UPEVP;
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 5 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 28  */
    private MVSP;
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 29  */
    private MST5_6;
    /**  Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 30  */
    private UP5_6;
    /**  Solidaritaetszuschlag, PAP Seite 31  */
    private MSOLZ;
    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 9 EStG), PAP Seite 32  */
    private UPANTEIL;
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 8 EStG), PAP Seite 33  */
    private MSONST;
    /**  Neu für 2022, PAP Seite 34  */
    private STSMIN;
    /**  Berechnung des SolZ auf sonstige Bezüge, PAP Seite 35, Neu ab 2021  */
    private MSOLZSTS;
    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 und 10 EStG), PAP Seite 36  */
    private MVMT;
    /**  Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 37  */
    private MOSONST;
    /**  Sonderberechnung mit sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 38  */
    private MRE4SONST;
    /**  Komplett Neu 2020  */
    /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 39  */
    private UPTAB23;
    /**
     * Getter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @return the value
     */
    getAf(): number;
    /**
     * Setter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @param {number} af input value
     */
    setAf(af: number): void;
    /**
     * Getter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @return the value
     */
    getAJAHR(): number;
    /**
     * Setter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @param {number} AJAHR input value
     */
    setAJAHR(AJAHR: number): void;
    /**
     * Getter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @return the value
     */
    getALTER1(): number;
    /**
     * Setter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @param {number} ALTER1 input value
     */
    setALTER1(ALTER1: number): void;
    /**
     * Getter for ENTSCH.
     * <p>
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG
                 sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 4 EStG) in Cent
     * <p>
     * @return the value
     */
    getENTSCH(): Big;
    /**
     * Setter for ENTSCH.
     * <p>
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG
                 sowie tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 4 EStG) in Cent
     * <p>
     * @param {Big} ENTSCH input value
     */
    setENTSCH(ENTSCH: Big): void;
    /**
     * Getter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @return the value
     */
    getF(): number;
    /**
     * Setter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @param {number} f input value
     */
    setF(f: number): void;
    /**
     * Getter for JFREIB.
     * <p>
     *  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2023 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getJFREIB(): Big;
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2023 in Cent (ggf. 0)
     * <p>
     * @param {Big} JFREIB input value
     */
    setJFREIB(JFREIB: Big): void;
    /**
     * Getter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2023 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getJHINZU(): Big;
    /**
     * Setter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2023 in Cent (ggf. 0)
     * <p>
     * @param {Big} JHINZU input value
     */
    setJHINZU(JHINZU: Big): void;
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
    getJRE4(): Big;
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
    setJRE4(JRE4: Big): void;
    /**
     * Getter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getJVBEZ(): Big;
    /**
     * Setter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} JVBEZ input value
     */
    setJVBEZ(JVBEZ: Big): void;
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
    getKRV(): number;
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
    setKRV(KRV: number): void;
    /**
     * Getter for KVZ.
     * <p>
     *  Einkommensbezogener Zusatzbeitragssatz eines gesetzlich krankenversicherten Arbeitnehmers,
             auf dessen Basis der an die Krankenkasse zu zahlende Zusatzbeitrag berechnet wird,
             in Prozent (bspw. 0,90 für 0,90 %) mit 2 Dezimalstellen.
             Der von der Kranken-kasse festgesetzte Zusatzbeitragssatz ist bei Abweichungen unmaßgeblich.
     * <p>
     * @return the value
     */
    getKVZ(): Big;
    /**
     * Setter for KVZ.
     * <p>
     *  Einkommensbezogener Zusatzbeitragssatz eines gesetzlich krankenversicherten Arbeitnehmers,
             auf dessen Basis der an die Krankenkasse zu zahlende Zusatzbeitrag berechnet wird,
             in Prozent (bspw. 0,90 für 0,90 %) mit 2 Dezimalstellen.
             Der von der Kranken-kasse festgesetzte Zusatzbeitragssatz ist bei Abweichungen unmaßgeblich.
     * <p>
     * @param {Big} KVZ input value
     */
    setKVZ(KVZ: Big): void;
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
    getLZZ(): number;
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
    setLZZ(LZZ: number): void;
    /**
     * Getter for LZZFREIB.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2023 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    getLZZFREIB(): Big;
    /**
     * Setter for LZZFREIB.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2023 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZFREIB input value
     */
    setLZZFREIB(LZZFREIB: Big): void;
    /**
     * Getter for LZZHINZU.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2023 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    getLZZHINZU(): Big;
    /**
     * Setter for LZZHINZU.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2023 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZHINZU input value
     */
    setLZZHINZU(LZZHINZU: Big): void;
    /**
     * Getter for MBV.
     * <p>
     *  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent
     * <p>
     * @return the value
     */
    getMBV(): Big;
    /**
     * Setter for MBV.
     * <p>
     *  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent
     * <p>
     * @param {Big} MBV input value
     */
    setMBV(MBV: Big): void;
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
    getPKPV(): Big;
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
    setPKPV(PKPV: Big): void;
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
    getPKV(): number;
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
    setPKV(PKV: number): void;
    /**
     * Getter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.
     * <p>
     * @return the value
     */
    getPVS(): number;
    /**
     * Setter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären, sonst 0.
     * <p>
     * @param {number} PVS input value
     */
    setPVS(PVS: number): void;
    /**
     * Getter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.
     * <p>
     * @return the value
     */
    getPVZ(): number;
    /**
     * Setter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat, sonst 0.
     * <p>
     * @param {number} PVZ input value
     */
    setPVZ(PVZ: number): void;
    /**
     * Getter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                 Bescheinigung für den Lohnsteuerabzug 2023 (bei keiner Religionszugehörigkeit = 0)
     * <p>
     * @return the value
     */
    getR(): number;
    /**
     * Setter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                 Bescheinigung für den Lohnsteuerabzug 2023 (bei keiner Religionszugehörigkeit = 0)
     * <p>
     * @param {number} R input value
     */
    setR(R: number): void;
    /**
     * Getter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2023 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent
     * <p>
     * @return the value
     */
    getRE4(): Big;
    /**
     * Setter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2023 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent
     * <p>
     * @param {Big} RE4 input value
     */
    setRE4(RE4: Big): void;
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
    getSONSTB(): Big;
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
    setSONSTB(SONSTB: Big): void;
    /**
     * Getter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
                 (in SONSTB enthalten) in Cents
     * <p>
     * @return the value
     */
    getSTERBE(): Big;
    /**
     * Setter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
                 soweit es sich nicht um Bezuege fuer mehrere Jahre handelt
                 (in SONSTB enthalten) in Cents
     * <p>
     * @param {Big} STERBE input value
     */
    setSTERBE(STERBE: Big): void;
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
    getSTKL(): number;
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
    setSTKL(STKL: number): void;
    /**
     * Getter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getVBEZ(): Big;
    /**
     * Setter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} VBEZ input value
     */
    setVBEZ(VBEZ: Big): void;
    /**
     * Getter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
                 in Cents
     * <p>
     * @return the value
     */
    getVBEZM(): Big;
    /**
     * Setter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
                 in Cents
     * <p>
     * @param {Big} VBEZM input value
     */
    setVBEZM(VBEZM: Big): void;
    /**
     * Getter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
                 bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
                 bei Versorgungsbezuegen in Cents
     * <p>
     * @return the value
     */
    getVBEZS(): Big;
    /**
     * Setter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns
                 bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen
                 bei Versorgungsbezuegen in Cents
     * <p>
     * @param {Big} VBEZS input value
     */
    setVBEZS(VBEZS: Big): void;
    /**
     * Getter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getVBS(): Big;
    /**
     * Setter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
     * <p>
     * @param {Big} VBS input value
     */
    setVBS(VBS: Big): void;
    /**
     * Getter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
                 mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
     * <p>
     * @return the value
     */
    getVJAHR(): number;
    /**
     * Setter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden
                 mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug
     * <p>
     * @param {number} VJAHR input value
     */
    setVJAHR(VJAHR: number): void;
    /**
     * Getter for VKAPA.
     * <p>
     *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
                 für mehrere Jahre in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getVKAPA(): Big;
    /**
     * Setter for VKAPA.
     * <p>
     *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
                 für mehrere Jahre in Cent (ggf. 0)
     * <p>
     * @param {Big} VKAPA input value
     */
    setVKAPA(VKAPA: Big): void;
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
    getVMT(): Big;
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
    setVMT(VMT: Big): void;
    /**
     * Getter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
     * <p>
     * @return the value
     */
    getZKF(): Big;
    /**
     * Setter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
     * <p>
     * @param {Big} ZKF input value
     */
    setZKF(ZKF: Big): void;
    /**
     * Getter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
                 erforderlich bei Jahresberechnung (LZZ = 1)
     * <p>
     * @return the value
     */
    getZMVB(): number;
    /**
     * Setter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
                 erforderlich bei Jahresberechnung (LZZ = 1)
     * <p>
     * @param {number} ZMVB input value
     */
    setZMVB(ZMVB: number): void;
    /**
     * Getter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent
     * <p>
     * @return the value
     */
    getJRE4ENT(): Big;
    /**
     * Setter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent
     * <p>
     * @param {Big} JRE4ENT input value
     */
    setJRE4ENT(JRE4ENT: Big): void;
    /**
     * Getter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht
                 tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @return the value
     */
    getSONSTENT(): Big;
    /**
     * Setter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie nicht
                 tarifermäßigt zu besteuernde Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @param {Big} SONSTENT input value
     */
    setSONSTENT(SONSTENT: Big): void;
    /**
     * Getter for BK.
     * <p>
     *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    getBK(): Big;
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
    getBKS(): Big;
    /**
     * Getter for BKV.
     * <p>
     *  Bemessungsgrundlage der Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
                 zu besteuernden Vorteile bei Vermögensbeteiligungen für die Kirchenlohnsteuer in Cent
     * <p>
     * @return the value
     */
    getBKV(): Big;
    /**
     * Getter for LSTLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents
     * <p>
     * @return the value
     */
    getLSTLZZ(): Big;
    /**
     * Getter for SOLZLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
                 in Cents
     * <p>
     * @return the value
     */
    getSOLZLZZ(): Big;
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
    getSOLZS(): Big;
    /**
     * Getter for SOLZV.
     * <p>
     *  Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt
                 zu besteuernden Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @return the value
     */
    getSOLZV(): Big;
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
    getSTS(): Big;
    /**
     * Getter for STV.
     * <p>
     *  Lohnsteuer für die Vergütung für mehrjährige Tätigkeit und der tarifermäßigt zu besteuernden
                 Vorteile bei Vermögensbeteiligungen in Cent
     * <p>
     * @return the value
     */
    getSTV(): Big;
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
    getVKVLZZ(): Big;
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
    getVKVSONST(): Big;
    /**
     * Getter for VFRB.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getVFRB(): Big;
    /**
     * Getter for VFRBS1.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getVFRBS1(): Big;
    /**
     * Getter for VFRBS2.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent
     * <p>
     * @return the value
     */
    getVFRBS2(): Big;
    /**
     * Getter for WVFRB.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
                dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getWVFRB(): Big;
    /**
     * Getter for WVFRBO.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
                bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getWVFRBO(): Big;
    /**
     * Getter for WVFRBM.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
                über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent
     * <p>
     * @return the value
     */
    getWVFRBM(): Big;
    /**
     * Initialize all inputs values with zero.
     */
    initInputs(): void;
    private isBigInput;
    /**
     * Setter for Big or number input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {number} value Value to set.
     */
    set(name: Lohnsteuer2023JanuarBigInBigType | Lohnsteuer2023JanuarBigInNumberType, value: TaxJsValueType): void;
    /**
     * Getter for all output parameters. You get a value of type "number or "Big".
     *
     * @param {string} name Variable name to get.
     */
    get(name: Lohnsteuer2023JanuarBigInBigType | Lohnsteuer2023JanuarBigInNumberType | Lohnsteuer2023JanuarBigOutType): TaxJsValueType;
    private static readonly typeDirectory;
    /**
     * Get all fields with types.
     */
    getDirectory(): TaxJsDictionary;
    /**
     * Converts a value (number or Big) in the correct type (number or Big).
     *
     * @param {string} name the name of the value
     * @param {TaxJsValueType} value the value to convert
     */
    toType(name: string, value: TaxJsValueType): TaxJsValueType;
}
export {};
