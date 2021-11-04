import Big from 'big.js';
import { TaxJs, TaxJsValueType, TaxJsDictionary } from '../../declaration/TaxJs';
declare type Lohnsteuer2010BigInBigType = "ENTSCH" | "JFREIB" | "JHINZU" | "JRE4" | "JVBEZ" | "LZZFREIB" | "LZZHINZU" | "PKPV" | "RE4" | "SONSTB" | "STERBE" | "VBEZ" | "VBEZM" | "VBEZS" | "VBS" | "VKAPA" | "VMT" | "ZKF";
declare type Lohnsteuer2010BigInNumberType = "AF" | "AJAHR" | "ALTER1" | "F" | "KRV" | "LZZ" | "PKV" | "PVS" | "PVZ" | "R" | "STKL" | "VJAHR" | "ZMVB";
declare type Lohnsteuer2010BigOutType = "BK" | "BKS" | "BKV" | "LSTLZZ" | "SOLZLZZ" | "SOLZS" | "SOLZV" | "STS" | "STV";
/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
export declare class Lohnsteuer2010Big implements TaxJs<Lohnsteuer2010BigInBigType, Lohnsteuer2010BigInNumberType, Lohnsteuer2010BigOutType> {
    private static readonly _n;
    private static readonly _b;
    private static readonly _i;
    private static readonly _o;
    private readonly Z_0;
    private readonly Z_1;
    private readonly Z_10;
    /**  Stand: 2015-11-16  */
    /**  ZIVIT Düsseldorf */
    /**   EINGABEPARAMETER   */
    /**  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)  */
    private AF;
    /**  Auf die Vollendung des 64. Lebensjahres folgende
         Kalenderjahr (erforderlich, wenn ALTER1=1)  */
    private AJAHR;
    /**  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
         der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0  */
    private ALTER1;
    /**  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent  */
    private ENTSCH;
    /**  eingetragener Faktor mit drei Nachkommastellen  */
    private F;
    /**  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
         Lohnsteuerkarte in Cents (ggf. 0)  */
    private JFREIB;
    /**  Jahreshinzurechnungsbetrag in Cents (ggf. 0)  */
    private JHINZU;
    /**  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent.
         Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB)
         oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
         Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem
         voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen
         Abrechnungszeitraum sind in voller Höhe hinzuzurechnen.  */
    private JRE4;
    /**  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
    private JVBEZ;
    /** Merker für die Vorsorgepauschale
        2 = der Arbeitnehmer ist NICCHT in der gesetzlichen Rentenversicherung versichert.
        
        1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
            Beitragsbemessungsgrenze OST.
            
        0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
            Beitragsbemessungsgrenze WEST.  */
    private KRV;
    /**  Lohnzahlungszeitraum:
         1 = Jahr
         2 = Monat
         3 = Woche
         4 = Tag  */
    private LZZ;
    /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
         den Lohnzahlungszeitraum in Cent  */
    private LZZFREIB;
    /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
         für den Lohnzahlungszeitraum in Cent  */
    private LZZHINZU;
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
    /**  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen
         für mehrere Jahre in Cent (ggf. 0)  */
    private VKAPA;
    /**  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen
         bei Versorgungsbezügen in Cent (ggf. 0)  */
    private VMT;
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
    /**  Altersentlastungsbetrag nach Alterseinkünftegesetz in €,
         Cent (2 Dezimalstellen)  */
    private ALTE;
    /**  Arbeitnehmer-Pauschbetrag in EURO  */
    private ANP;
    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
         auf ganze Cents abgerundet  */
    private ANTEIL1;
    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
         auf ganze Cents aufgerundet  */
    private ANTEIL2;
    /**  Bemessungsgrundlage für Altersentlastungsbetrag in €, Cent
         (2 Dezimalstellen)  */
    private BMG;
    /**  Differenz zwischen ST1 und ST2 in EURO  */
    private DIFF;
    /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
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
    /**  Beitragssatz des Arbeitgebers zur Krankenversicherung (5 Dezimalstellen)  */
    private KVSATZAG;
    /**  Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)  */
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
    /**  Beitragssatz des Arbeitgebers zur Pflegeversicherung (5 Dezimalstellen)  */
    private PVSATZAG;
    /**  Beitragssatz des Arbeitnehmers zur Pflegeversicherung (5 Dezimalstellen)  */
    private PVSATZAN;
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
    /**  Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehrjährige Tätigkeit  */
    private STOVMT;
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
    private readonly ZAHL500;
    private readonly ZAHL700;
    /**  PROGRAMMABLAUFPLAN 2010, PAP Seite 10  */
    calculate(): void;
    /**  Ermittlung des Jahresarbeitslohns nach § 39 b Abs. 2 Satz 2 EStG, PAP Seite 11  */
    private MRE4JL;
    /**  Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 12  */
    private MRE4;
    /**  Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 13  */
    private MRE4ALTE;
    /**  Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 15  */
    private MRE4ABZ;
    /**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 16  */
    private MZTABFB;
    /**  Ermittlung Jahreslohnsteuer, PAP Seite 17  */
    private MLSTJAHR;
    /**  PAP Seite 18 Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif  */
    private UPMLST;
    /**  	Vorsorgepauschale (§ 39b Abs. 2 Satz 5 Nr 3 EStG) nach dem Bürgerentlastungsgesetz Krankenversicherung
              Achtung: Es wird davon ausgegangen, dass
                  a) Die Rentenversicherungsbemessungsgrenze sich 2010 für die alten Bundesländer auf 66.000 Euro erhöht
                       und für die neuen Beundesländer auf 55.800 festgelegt wird sowie
                       
                  b) der Beitragssatz zur Rentenversicherung gegenüber 2009 unverändert bleibt.
              
              PAP Seite 19   */
    private UPEVP;
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 5 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 20  */
    private MVSP;
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 21  */
    private MST5_6;
    /**  Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 21  */
    private UP5_6;
    /**  Solidaritaetszuschlag, PAP Seite 22  */
    private MSOLZ;
    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 9 EStG), PAP Seite 23  */
    private UPANTEIL;
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 8 EStG), PAP Seite 24  */
    private MSONST;
    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 und 10 EStG), PAP Seite 25  */
    private MVMT;
    /**  Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 26  */
    private MOSONST;
    /**  Sonderberechnung mit sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 26  */
    private MRE4SONST;
    /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 27  */
    private UPTAB10;
    /**
     * Getter for AF.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @return the value
     */
    getAF(): number;
    /**
     * Setter for AF.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @param {number} AF input value
     */
    setAF(AF: number): void;
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
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent
     * <p>
     * @return the value
     */
    getENTSCH(): Big;
    /**
     * Setter for ENTSCH.
     * <p>
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent
     * <p>
     * @param {Big} ENTSCH input value
     */
    setENTSCH(ENTSCH: Big): void;
    /**
     * Getter for F.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @return the value
     */
    getF(): number;
    /**
     * Setter for F.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @param {number} F input value
     */
    setF(F: number): void;
    /**
     * Getter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getJFREIB(): Big;
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
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
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent.
             Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB)
             oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
             Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem
             voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen
             Abrechnungszeitraum sind in voller Höhe hinzuzurechnen.
     * <p>
     * @return the value
     */
    getJRE4(): Big;
    /**
     * Setter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent.
             Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB)
             oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
             Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem
             voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen
             Abrechnungszeitraum sind in voller Höhe hinzuzurechnen.
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
            2 = der Arbeitnehmer ist NICCHT in der gesetzlichen Rentenversicherung versichert.
            
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
            2 = der Arbeitnehmer ist NICCHT in der gesetzlichen Rentenversicherung versichert.
            
            1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                Beitragsbemessungsgrenze OST.
                
            0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die
                Beitragsbemessungsgrenze WEST.
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
     * Getter for LZZFREIB.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
             den Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    getLZZFREIB(): Big;
    /**
     * Setter for LZZFREIB.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
             den Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZFREIB input value
     */
    setLZZFREIB(LZZFREIB: Big): void;
    /**
     * Getter for LZZHINZU.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             für den Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    getLZZHINZU(): Big;
    /**
     * Setter for LZZHINZU.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             für den Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZHINZU input value
     */
    setLZZHINZU(LZZHINZU: Big): void;
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
     *  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen
             bei Versorgungsbezügen in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getVMT(): Big;
    /**
     * Setter for VMT.
     * <p>
     *  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen
             bei Versorgungsbezügen in Cent (ggf. 0)
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
    /**
     * Setter for Big input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {Big} value Value to set.
     */
    setBig(name: Lohnsteuer2010BigInBigType, value: Big): void;
    /**
     * Setter for number input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {number} value Value to set.
     */
    setNumber(name: Lohnsteuer2010BigInNumberType, value: number): void;
    /**
     * Getter for all output parameters. You get a value of type "number or "Big".
     *
     * @param {string} name Variable name to get.
     */
    get(name: Lohnsteuer2010BigInBigType | Lohnsteuer2010BigInNumberType | Lohnsteuer2010BigOutType): TaxJsValueType;
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
