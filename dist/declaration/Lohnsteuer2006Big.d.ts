import Big from 'big.js';
import { TaxJs, TaxJsValueType, TaxJsDictionary } from '../../TaxJs';
type Lohnsteuer2006BigInBigType = "HINZUR" | "JFREIB" | "JHINZU" | "JRE4" | "JVBEZ" | "RE4" | "SONSTB" | "STERBE" | "VBEZ" | "VBEZM" | "VBEZS" | "VBS" | "VKAPA" | "VMT" | "WFUNDF" | "ZKF";
type Lohnsteuer2006BigInNumberType = "AJAHR" | "ALTER1" | "KRV" | "LZZ" | "R" | "STKL" | "VJAHR" | "ZMVB";
type Lohnsteuer2006BigOutType = "BK" | "BKS" | "BKV" | "LSTLZZ" | "SOLZLZZ" | "SOLZS" | "SOLZV" | "STS" | "STV";
/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
export declare class Lohnsteuer2006Big implements TaxJs<Lohnsteuer2006BigInBigType, Lohnsteuer2006BigInNumberType, Lohnsteuer2006BigOutType> {
    private static readonly _n;
    private static readonly _b;
    private static readonly _i;
    private static readonly _o;
    private static readonly _s;
    private static readonly _d;
    private readonly Z_0;
    private readonly Z_1;
    private readonly Z_10;
    /**   EINGABEPARAMETER   */
    /**  Auf die Vollendung des 64. Lebensjahres folgende
         Kalenderjahr (erforderlich, wenn ALTER1=1)  */
    private AJAHR;
    /**  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
         der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0  */
    private ALTER1;
    /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
         fuer den Lohnzahlungszeitraum in Cents  */
    private HINZUR;
    /**  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
         Lohnsteuerkarte in Cents (ggf. 0)  */
    private JFREIB;
    /**  Jahreshinzurechnungsbetrag in Cents (ggf. 0)  */
    private JHINZU;
    /**  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
         ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
         Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
         „sonstiger Bezuege“ (Feld SONSTB) oder bei Eingabe der „Verguetung
         fuer mehrjaehrige Taetigkeit“ (Feld VMT).  */
    private JRE4;
    /**  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
    private JVBEZ;
    /**  1 = der Arbeitnehmer ist im Lohnzahlungszeitraum in der gesetzlichen
         Rentenversicherung versicherungsfrei und gehoert zu den in
         § 10 c Abs. 3 EStG genannten Personen.
         Bei anderen Arbeitnehmern ist „0“ einzusetzen.
         Fuer die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten
         Tatsachen ma&szlig;gebend; zusaetzliche Ermittlungen braucht
         der Arbeitgeber nicht anzustellen.  */
    private KRV;
    /**  Lohnzahlungszeitraum:
         1 = Jahr
         2 = Monat
         3 = Woche
         4 = Tag  */
    private LZZ;
    /**  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
         keiner Religionszugehoerigkeit = 0)  */
    private R;
    /**  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
         fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
         der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
         Freibetrags in Cents.  */
    private RE4;
    /**  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
         Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
         soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)  */
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
    /**  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)  */
    private VKAPA;
    /**  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei
         Versorgungsbezuegen in Cents (ggf. 0)  */
    private VMT;
    /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
         fuer den Lohnzahlungszeitraum in Cents  */
    private WFUNDF;
    /**  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
         I, II, III und IV)  */
    private ZKF;
    /**  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
         erforderlich bei Jahresberechnung (LZZ = 1)  */
    private ZMVB;
    /**   AUSGABEPARAMETER   */
    /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
    private BK;
    /**  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
         fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents  */
    private BKS;
    private BKV;
    /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
    private LSTLZZ;
    /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
         in Cents  */
    private SOLZLZZ;
    /**  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
         Taetigkeit) in Cents  */
    private SOLZS;
    /**  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
         Cents  */
    private SOLZV;
    /**  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
         Taetigkeit) in Cents  */
    private STS;
    /**  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents  */
    private STV;
    /**   INTERNE FELDER   */
    /**  Altersentlastungsbetrag nach Alterseinkuenftegesetz in Cents  */
    private ALTE;
    /**  Arbeitnehmer-Pauschbetrag in EURO  */
    private ANP;
    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
         auf ganze Cents abgerundet  */
    private ANTEIL1;
    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
         auf ganze Cents aufgerundet  */
    private ANTEIL2;
    /**  Bemessungsgrundlage fuer Altersentlastungsbetrag in Cents  */
    private BMG;
    /**  Differenz zwischen ST1 und ST2 in EURO  */
    private DIFF;
    /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
    private EFA;
    /**  Versorgungsfreibetrag in Cents  */
    private FVB;
    /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
    private FVBZ;
    /**  Massgeblich maximaler Versorgungsfreibetrag in Cents  */
    private HFVB;
    /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
    private J;
    /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
         Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
    private JBMG;
    /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
         UPANTEIL errechnet werden soll in Cents  */
    private JW;
    /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
    private K;
    /**  Kennzeichen bei Verguetung fuer mehrjaehrige Taetigkeit
         0 = beim Vorwegabzug ist ZRE4VP zu beruecksichtigen
         1 = beim Vorwegabzug ist ZRE4VP1 zu beruecksichtigen  */
    private KENNZ;
    /**  Summe der Freibetraege fuer Kinder in EURO  */
    private KFB;
    /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
         1 = Grundtabelle
         2 = Splittingtabelle  */
    private KZTAB;
    /**  Jahreslohnsteuer in EURO  */
    private LSTJAHR;
    /**  Zwischenfelder der Jahreslohnsteuer in Cents  */
    private LST1;
    private LST2;
    private LST3;
    /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
    private MIST;
    /**  Arbeitslohn des Lohnzahlungszeitraums nach Abzug der Freibetraege
         fuer Versorgungsbezuege, des Altersentlastungsbetrags und des
         in der Lohnsteuerkarte eingetragenen Freibetrags und Hinzurechnung
         eines Hinzurechnungsbetrags in Cents. Entspricht dem Arbeitslohn,
         fuer den die Lohnsteuer im personellen Verfahren aus der
         zum Lohnzahlungszeitraum gehoerenden Tabelle abgelesen wuerde  */
    private RE4LZZ;
    /**  Arbeitslohn des Lohnzahlungszeitraums nach Abzug der Freibetraege
         fuer Versorgungsbezuege und des Altersentlastungsbetrags in
         Cents zur Berechnung der Vorsorgepauschale  */
    private RE4LZZV;
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
    /**  Tarifliche Einkommensteuer in EURO  */
    private ST;
    /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in EURO  */
    private ST1;
    /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in EURO  */
    private ST2;
    /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
    private VBEZB;
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
    /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 3 EStG in EURO  */
    private VSPKURZ;
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
    /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG
         (2 Dezimalstellen)  */
    private X;
    /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
    private Y;
    /**  Auf einen Jahreslohn hochgerechnetes RE4LZZ in EURO, C (2 Dezimalstellen)  */
    private ZRE4;
    /**  Auf einen Jahreslohn hochgerechnetes RE4LZZV zur Berechnung
         der Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
    private ZRE4VP;
    /**  Sicherungsfeld von ZRE4VP in EURO,C bei der Berechnung des Vorwegabzugs
         fuer die Verguetung fuer mehrjaehrige Taetigkeit  */
    private ZRE4VP1;
    /**  Feste Tabellenfreibetraege (ohne Vorsorgepauschale) in EURO  */
    private ZTABFB;
    /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
         EURO, C (2 Dezimalstellen)  */
    private ZVBEZ;
    /**  Zu versteuerndes Einkommen in EURO  */
    private ZVE;
    /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
         Abs. 2 Satz 8 EStG in EURO. */
    private ZX;
    private ZZX;
    private HOCH;
    private VERGL;
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
    private readonly ZAHL0;
    private readonly ZAHL1;
    private readonly ZAHL2;
    private readonly ZAHL3;
    private readonly ZAHL4;
    private readonly ZAHL5;
    private readonly ZAHL6;
    private readonly ZAHL7;
    private readonly ZAHL8;
    private readonly ZAHL9;
    private readonly ZAHL10;
    private readonly ZAHL11;
    private readonly ZAHL12;
    private readonly ZAHL100;
    private readonly ZAHL360;
    /**  PROGRAMMABLAUFPLAN 2006  */
    calculate(): void;
    /**  Freibetraege fuer Versorgungsbezuege, Altersentlastungsbetrag (§39b Abs. 2 Satz 2 EStG)
         PAP Seite 10  */
    private MRE4LZZ;
    /**  Massgeblicher Arbeitslohn fuer die Jahreslohnsteuer
         PAP Seite 12  */
    private MRE4;
    /**  Ermittlung der festen Tabellenfreibetraege (ohne Vorsorgepauschale)
         PAP Seite 13  */
    private MZTABFB;
    /**  Ermittlung Jahreslohnsteuer
         PAP Seite 14  */
    private MLSTJAHR;
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 6 Nr 3 EStG)
         PAP Seite 15  */
    private UPEVP;
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 6 Nr 3 EStG) Vergleichsberechnung
         fuer Guenstigerpruefung
         PAP Seite 16  */
    private MVSP;
    /**  Vorsorgepauschale
         PAP Seite 17  */
    private UMVSP;
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 8 EStG)
         PAP Seite 18  */
    private MST5_6;
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 8 EStG)
         PAP Seite 18  */
    private UP5_6;
    /**  Solidaritaetszuschlag
         PAP Seite 19  */
    private MSOLZ;
    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 10 EStG)
         PAP Seite 20  */
    private UPANTEIL;
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 7 EStG)
         PAP Seite 21  */
    private MSONST;
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 7 EStG)
         PAP Seite 21  */
    private MRE4LZZ2;
    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 EStG)
         PAP Seite 22  */
    private MVMT;
    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 EStG)
         PAP Seite 23  */
    private UPTAB05;
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
     * Getter for HINZUR.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @return the value
     */
    getHINZUR(): Big;
    /**
     * Setter for HINZUR.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @param {Big} HINZUR input value
     */
    setHINZUR(HINZUR: Big): void;
    /**
     * Getter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getJFREIB(): Big;
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0)
     * <p>
     * @param {Big} JFREIB input value
     */
    setJFREIB(JFREIB: Big): void;
    /**
     * Getter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getJHINZU(): Big;
    /**
     * Setter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag in Cents (ggf. 0)
     * <p>
     * @param {Big} JHINZU input value
     */
    setJHINZU(JHINZU: Big): void;
    /**
     * Getter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
             ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
             Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
             „sonstiger Bezuege“ (Feld SONSTB) oder bei Eingabe der „Verguetung
             fuer mehrjaehrige Taetigkeit“ (Feld VMT).
     * <p>
     * @return the value
     */
    getJRE4(): Big;
    /**
     * Setter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
             ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
             Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
             „sonstiger Bezuege“ (Feld SONSTB) oder bei Eingabe der „Verguetung
             fuer mehrjaehrige Taetigkeit“ (Feld VMT).
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
     *  1 = der Arbeitnehmer ist im Lohnzahlungszeitraum in der gesetzlichen
             Rentenversicherung versicherungsfrei und gehoert zu den in
             § 10 c Abs. 3 EStG genannten Personen.
             Bei anderen Arbeitnehmern ist „0“ einzusetzen.
             Fuer die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten
             Tatsachen ma&szlig;gebend; zusaetzliche Ermittlungen braucht
             der Arbeitgeber nicht anzustellen.
     * <p>
     * @return the value
     */
    getKRV(): number;
    /**
     * Setter for KRV.
     * <p>
     *  1 = der Arbeitnehmer ist im Lohnzahlungszeitraum in der gesetzlichen
             Rentenversicherung versicherungsfrei und gehoert zu den in
             § 10 c Abs. 3 EStG genannten Personen.
             Bei anderen Arbeitnehmern ist „0“ einzusetzen.
             Fuer die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten
             Tatsachen ma&szlig;gebend; zusaetzliche Ermittlungen braucht
             der Arbeitgeber nicht anzustellen.
     * <p>
     * @param {number} KRV input value
     */
    setKRV(KRV: number): void;
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
     * Getter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0)
     * <p>
     * @return the value
     */
    getR(): number;
    /**
     * Setter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0)
     * <p>
     * @param {number} R input value
     */
    setR(R: number): void;
    /**
     * Getter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
             der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
             Freibetrags in Cents.
     * <p>
     * @return the value
     */
    getRE4(): Big;
    /**
     * Setter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
             der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
             Freibetrags in Cents.
     * <p>
     * @param {Big} RE4 input value
     */
    setRE4(RE4: Big): void;
    /**
     * Getter for SONSTB.
     * <p>
     *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getSONSTB(): Big;
    /**
     * Setter for SONSTB.
     * <p>
     *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen,
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)
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
     *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getVKAPA(): Big;
    /**
     * Setter for VKAPA.
     * <p>
     *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)
     * <p>
     * @param {Big} VKAPA input value
     */
    setVKAPA(VKAPA: Big): void;
    /**
     * Getter for VMT.
     * <p>
     *  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei
             Versorgungsbezuegen in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getVMT(): Big;
    /**
     * Setter for VMT.
     * <p>
     *  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei
             Versorgungsbezuegen in Cents (ggf. 0)
     * <p>
     * @param {Big} VMT input value
     */
    setVMT(VMT: Big): void;
    /**
     * Getter for WFUNDF.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @return the value
     */
    getWFUNDF(): Big;
    /**
     * Setter for WFUNDF.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents
     * <p>
     * @param {Big} WFUNDF input value
     */
    setWFUNDF(WFUNDF: Big): void;
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
     *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    getBKS(): Big;
    /**
     * Getter for BKV.
     * <p>
     *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents
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
     *  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents
     * <p>
     * @return the value
     */
    getSOLZS(): Big;
    /**
     * Getter for SOLZV.
     * <p>
     *  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
             Cents
     * <p>
     * @return the value
     */
    getSOLZV(): Big;
    /**
     * Getter for STS.
     * <p>
     *  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents
     * <p>
     * @return the value
     */
    getSTS(): Big;
    /**
     * Getter for STV.
     * <p>
     *  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents
     * <p>
     * @return the value
     */
    getSTV(): Big;
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
    set(name: Lohnsteuer2006BigInBigType | Lohnsteuer2006BigInNumberType, value: TaxJsValueType): void;
    /**
     * Getter for all output parameters. You get a value of type "number or "Big".
     *
     * @param {string} name Variable name to get.
     */
    get(name: Lohnsteuer2006BigInBigType | Lohnsteuer2006BigInNumberType | Lohnsteuer2006BigOutType): TaxJsValueType;
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
