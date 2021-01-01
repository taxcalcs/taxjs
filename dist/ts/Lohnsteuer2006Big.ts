
import Big, { RoundingMode } from 'big.js';

/**
* Steuerberechnungsklasse.
* 
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
* 
*/
export class Lohnsteuer2006Big implements TaxJs {
    private readonly Z_0 : Big = new Big(0);
    private readonly Z_1 : Big = new Big(1);
	private readonly Z_10 : Big = new Big(10);
    

    /**   EINGABEPARAMETER   */
 
        /**  Auf die Vollendung des 64. Lebensjahres folgende 
             Kalenderjahr (erforderlich, wenn ALTER1=1)  */
        private AJAHR : number;
                
        /**  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem 
             der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0  */
        private ALTER1 : number;

        /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents  */
        private HINZUR : Big;

        /**  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0)  */
        private JFREIB : Big;

        /**  Jahreshinzurechnungsbetrag in Cents (ggf. 0)  */
        private JHINZU : Big;

        /**  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezuege und
             ohne Verguetung fuer mehrjaehrige Taetigkeit in Cents (ggf. 0)
             Anmerkung: Die Eingabe dieses Feldes ist erforderlich bei Eingabe
             „sonstiger Bezuege“ (Feld SONSTB) oder bei Eingabe der „Verguetung
             fuer mehrjaehrige Taetigkeit“ (Feld VMT).  */
        private JRE4 : Big;

        /**  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
        private JVBEZ : Big;

        /**  1 = der Arbeitnehmer ist im Lohnzahlungszeitraum in der gesetzlichen
             Rentenversicherung versicherungsfrei und gehoert zu den in
             § 10 c Abs. 3 EStG genannten Personen.
             Bei anderen Arbeitnehmern ist „0“ einzusetzen.
             Fuer die Zuordnung sind allein die dem Arbeitgeber ohnehin bekannten
             Tatsachen ma&szlig;gebend; zusaetzliche Ermittlungen braucht
             der Arbeitgeber nicht anzustellen.  */
        private KRV : number;

        /**  Lohnzahlungszeitraum:
             1 = Jahr
             2 = Monat
             3 = Woche
             4 = Tag  */
        private LZZ : number;

        /**  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0)  */
        private R : number;

        /**  Steuerpflichtiger Arbeitslohn vor Beruecksichtigung der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des auf
             der Lohnsteuerkarte fuer den Lohnzahlungszeitraum eingetragenen
             Freibetrags in Cents.  */
        private RE4 : Big;

        /**  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich 
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen, 
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0)  */
        private SONSTB : Big;

        /**  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen, 
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt 
             (in SONSTB enthalten) in Cents  */
        private STERBE : Big;

        /**  Steuerklasse:
             1 = I
             2 = II
             3 = III
             4 = IV
             5 = V
             6 = VI  */
        private STKL : number;

        /**  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
        private VBEZ : Big;

        /**  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
             in Cents */
        private VBEZM : Big;

        /**  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns 
             bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen 
             bei Versorgungsbezuegen in Cents */
        private VBEZS : Big;

        /**  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld 
            in Cents (ggf. 0)  */
        private VBS : Big;

        /**  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden 
             mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug  */
        private VJAHR : number;

        /**  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0)  */
        private VKAPA : Big;

        /**  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei 
             Versorgungsbezuegen in Cents (ggf. 0)  */
        private VMT : Big;

        /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents  */
        private WFUNDF : Big;

        /**  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
             I, II, III und IV)  */
        private ZKF : Big;

        /**  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
             erforderlich bei Jahresberechnung (LZZ = 1)  */
        private ZMVB : number;

    	

    	/**   AUSGABEPARAMETER   */
		

        /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
        private BK : Big = this.Z_0;

        /**  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents  */
        private BKS : Big = this.Z_0;

        private BKV : Big = this.Z_0;

        /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
        private LSTLZZ : Big = this.Z_0;

        /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
             in Cents  */
        private SOLZLZZ : Big = this.Z_0;

        /**  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents  */
        private SOLZS : Big = this.Z_0;

        /**  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
             Cents  */
        private SOLZV : Big = this.Z_0;

        /**  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents  */
        private STS : Big = this.Z_0;

        /**  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents  */
        private STV : Big = this.Z_0;


   		

	    /**   INTERNE FELDER   */
		

        /**  Altersentlastungsbetrag nach Alterseinkuenftegesetz in Cents  */
        private ALTE : Big = this.Z_0;

        /**  Arbeitnehmer-Pauschbetrag in EURO  */
        private ANP : Big = this.Z_0;

        /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
             auf ganze Cents abgerundet  */
        private ANTEIL1 : Big = this.Z_0;

        /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
             auf ganze Cents aufgerundet  */
        private ANTEIL2 : Big = this.Z_0;

        /**  Bemessungsgrundlage fuer Altersentlastungsbetrag in Cents  */
        private BMG : Big = this.Z_0;

        /**  Differenz zwischen ST1 und ST2 in EURO  */
        private DIFF : Big = this.Z_0;

        /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
        private EFA : Big = this.Z_0;

        /**  Versorgungsfreibetrag in Cents  */
        private FVB : Big = this.Z_0;

        /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
        private FVBZ : Big = this.Z_0;

        /**  Massgeblich maximaler Versorgungsfreibetrag in Cents  */
        private HFVB : Big = this.Z_0;

        /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
        private J : number = 0;

        /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
             Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
        private JBMG : Big = this.Z_0;

        /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
             UPANTEIL errechnet werden soll in Cents  */
        private JW : Big = this.Z_0;

        /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
        private K : number = 0;

        /**  Kennzeichen bei Verguetung fuer mehrjaehrige Taetigkeit
             0 = beim Vorwegabzug ist ZRE4VP zu beruecksichtigen
             1 = beim Vorwegabzug ist ZRE4VP1 zu beruecksichtigen  */
        private KENNZ : number = 0;

        /**  Summe der Freibetraege fuer Kinder in EURO  */
        private KFB : Big = this.Z_0;

        /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
             1 = Grundtabelle
             2 = Splittingtabelle  */
        private KZTAB : number = 0;

        /**  Jahreslohnsteuer in EURO  */
        private LSTJAHR : Big = this.Z_0;

        /**  Zwischenfelder der Jahreslohnsteuer in Cents  */
        private LST1 : Big = this.Z_0;
        private LST2 : Big = this.Z_0;
        private LST3 : Big = this.Z_0;

        /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
        private MIST : Big = this.Z_0;

        /**  Arbeitslohn des Lohnzahlungszeitraums nach Abzug der Freibetraege
             fuer Versorgungsbezuege, des Altersentlastungsbetrags und des
             in der Lohnsteuerkarte eingetragenen Freibetrags und Hinzurechnung
             eines Hinzurechnungsbetrags in Cents. Entspricht dem Arbeitslohn,
             fuer den die Lohnsteuer im personellen Verfahren aus der
             zum Lohnzahlungszeitraum gehoerenden Tabelle abgelesen wuerde  */
        private RE4LZZ : Big = this.Z_0;

        /**  Arbeitslohn des Lohnzahlungszeitraums nach Abzug der Freibetraege
             fuer Versorgungsbezuege und des Altersentlastungsbetrags in
             Cents zur Berechnung der Vorsorgepauschale  */
        private RE4LZZV : Big = this.Z_0;

        /**  Rechenwert in Gleitkommadarstellung  */
        private RW : Big = this.Z_0;

        /**  Sonderausgaben-Pauschbetrag in EURO  */
        private SAP : Big = this.Z_0;

        /**  Freigrenze fuer den Solidaritaetszuschlag in EURO  */
        private SOLZFREI : Big = this.Z_0;

        /**  Solidaritaetszuschlag auf die Jahreslohnsteuer in EURO, C (2 Dezimalstellen)  */
        private SOLZJ : Big = this.Z_0;

        /**  Zwischenwert fuer den Solidaritaetszuschlag auf die Jahreslohnsteuer
             in EURO, C (2 Dezimalstellen)  */
        private SOLZMIN : Big = this.Z_0;

        /**  Tarifliche Einkommensteuer in EURO  */
        private ST : Big = this.Z_0;

        /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in EURO  */
        private ST1 : Big = this.Z_0;

        /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in EURO  */
        private ST2 : Big = this.Z_0;

        /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
        private VBEZB : Big = this.Z_0;

        /**  Hoechstbetrag der Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
        private VHB : Big = this.Z_0;

        /**  Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
        private VSP : Big = this.Z_0;

        /**  Vorsorgepauschale nach Alterseinkuenftegesetz in EURO, C  */
        private VSPN : Big = this.Z_0;

        /**  Zwischenwert 1 bei der Berechnung der Vorsorgepauschale nach
             dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
        private VSP1 : Big = this.Z_0;

        /**  Zwischenwert 2 bei der Berechnung der Vorsorgepauschale nach
             dem Alterseinkuenftegesetz in EURO, C (2 Dezimalstellen)  */
        private VSP2 : Big = this.Z_0;

        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 3 EStG in EURO  */
        private VSPKURZ : Big = this.Z_0;

        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 2 EStG in EURO  */
        private VSPMAX1 : Big = this.Z_0;

        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 3 EStG in EURO  */
        private VSPMAX2 : Big = this.Z_0;

        /**  Vorsorgepauschale nach § 10c Abs. 2 Satz 2 EStG vor der Hoechstbetragsberechnung
             in EURO, C (2 Dezimalstellen)  */
        private VSPO : Big = this.Z_0;

        /**  Fuer den Abzug nach § 10c Abs. 2 Nrn. 2 und 3 EStG verbleibender
             Rest von VSPO in EURO, C (2 Dezimalstellen)  */
        private VSPREST : Big = this.Z_0;

        /**  Hoechstbetrag der Vorsorgepauschale nach § 10c Abs. 2 Nr. 1 EStG
             in EURO, C (2 Dezimalstellen)  */
        private VSPVOR : Big = this.Z_0;

        /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG
             (2 Dezimalstellen)  */
        private X : Big = this.Z_0;

        /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
        private Y : Big = this.Z_0;

        /**  Auf einen Jahreslohn hochgerechnetes RE4LZZ in EURO, C (2 Dezimalstellen)  */
        private ZRE4 : Big = this.Z_0;

        /**  Auf einen Jahreslohn hochgerechnetes RE4LZZV zur Berechnung
             der Vorsorgepauschale in EURO, C (2 Dezimalstellen)  */
        private ZRE4VP : Big = this.Z_0;

        /**  Sicherungsfeld von ZRE4VP in EURO,C bei der Berechnung des Vorwegabzugs
             fuer die Verguetung fuer mehrjaehrige Taetigkeit  */
        private ZRE4VP1 : Big = this.Z_0;

        /**  Feste Tabellenfreibetraege (ohne Vorsorgepauschale) in EURO  */
        private ZTABFB : Big = this.Z_0;

        /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
             EURO, C (2 Dezimalstellen)  */
        private ZVBEZ : Big = this.Z_0;

        /**  Zu versteuerndes Einkommen in EURO  */
        private ZVE : Big = this.Z_0;

        /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
             Abs. 2 Satz 8 EStG in EURO. */
        private ZX : Big = this.Z_0;
        private ZZX : Big = this.Z_0;
        private HOCH : Big = this.Z_0;
        private VERGL : Big = this.Z_0;
		
    
        /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
        private readonly TAB1 : number[] = [0.0, 0.400, 0.384, 0.368, 0.352, 0.336, 0.320, 0.304, 0.288, 0.272, 0.256, 0.240, 0.224, 0.208, 0.192, 0.176, 0.160, 0.152, 0.144, 0.136, 0.128, 0.120, 0.112, 0.104, 0.096, 0.088, 0.080, 0.072, 0.064, 0.056, 0.048, 0.040, 0.032, 0.024, 0.016, 0.008, 0.000];

        /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
        private readonly TAB2 : number[] = [0, 3000, 2880, 2760, 2640, 2520, 2400, 2280, 2160, 2040, 1920, 1800, 1680, 1560, 1440, 1320, 1200, 1140, 1080, 1020, 960, 900, 840, 780, 720, 660, 600, 540, 480, 420, 360, 300, 240, 180, 120, 60, 0];

        /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
        private readonly TAB3 : number[] = [0, 900, 864, 828, 792, 756, 720, 684, 648, 612, 576, 540, 504, 468, 432, 396, 360, 342, 324, 306, 288, 270, 252, 234, 216, 198, 180, 162, 144, 126, 108, 90, 72, 54, 36, 18, 0];

        /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
        private readonly TAB4 : number[] = [0.0, 0.400, 0.384, 0.368, 0.352, 0.336, 0.320, 0.304, 0.288, 0.272, 0.256, 0.240, 0.224, 0.208, 0.192, 0.176, 0.160, 0.152, 0.144, 0.136, 0.128, 0.120, 0.112, 0.104, 0.096, 0.088, 0.080, 0.072, 0.064, 0.056, 0.048, 0.040, 0.032, 0.024, 0.016, 0.008, 0.000];

        /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
        private readonly TAB5 : number[] = [0, 1900, 1824, 1748, 1672, 1596, 1520, 1444, 1368, 1292, 1216, 1140, 1064, 988, 912, 836, 760, 722, 684, 646, 608, 570, 532, 494, 456, 418, 380, 342, 304, 266, 228, 190, 152, 114, 76, 38, 0];

        /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
        private readonly ZAHL0 : Big = this.Z_0;
        private readonly ZAHL1 : Big = new Big(1);
        private readonly ZAHL2 : Big = new Big(2);
        private readonly ZAHL3 : Big = new Big(3);
        private readonly ZAHL4 : Big = new Big(4);
        private readonly ZAHL5 : Big = new Big(5);
        private readonly ZAHL6 : Big = new Big(6);
        private readonly ZAHL7 : Big = new Big(7);
        private readonly ZAHL8 : Big = new Big(8);
        private readonly ZAHL9 : Big = new Big(9);
        private readonly ZAHL10 : Big = new Big(10);
        private readonly ZAHL11 : Big = new Big(11);
        private readonly ZAHL12 : Big = new Big(12);

        private readonly ZAHL100 : Big = new Big(100);
        private readonly ZAHL360 : Big = new Big(360);

    

    /**  PROGRAMMABLAUFPLAN 2006  */

    public calculate() : void {
        this.MRE4LZZ();
        this.KENNZ = 0;
        this.RE4LZZ = this.RE4.sub(this.FVB).sub(this.ALTE).sub(this.WFUNDF).add(this.HINZUR);
        this.RE4LZZV = this.RE4.sub(this.FVB).sub(this.ALTE);
        this.MRE4();
        this.MZTABFB();
        this.MLSTJAHR();
        this.LSTJAHR = this.ST;
        this.JW = this.LSTJAHR.mul(this.ZAHL100);
        this.UPANTEIL();
        this.LSTLZZ = this.ANTEIL1;

        if (this.ZKF.cmp(this.ZAHL0) == 1) {
        
            this.ZTABFB = this.ZTABFB.add(this.KFB);
            this.MLSTJAHR();
            this.JBMG = this.ST;
        
        }else {
            this.JBMG = this.LSTJAHR;
        
        }

        this.MSOLZ();
        this.MSONST();
        this.MVMT();
    }




    /**  Freibetraege fuer Versorgungsbezuege, Altersentlastungsbetrag (§39b Abs. 2 Satz 2 EStG) 
         PAP Seite 10  */

    private MRE4LZZ() : void {
        if (this.VBEZ.cmp(this.ZAHL0) == 0) {			
        
            this.FVBZ = this.ZAHL0;
            this.FVB = this.ZAHL0;
        
        }else {
            if (this.VJAHR < 2006) {
            
                this.J = 1;
            
            }else {
                if (this.VJAHR < 2040) {
                
                    this.J = this.VJAHR - 2004;
                
                }else {
                    this.J = 36;
                
                }
            
            }

            if (this.LZZ == 1) {
            
                if (((this.STERBE.add(this.VKAPA)).cmp(this.ZAHL0)) == 1) {
                
                    this.VBEZB = (this.VBEZM.mul(new Big(this.ZMVB))).add(this.VBEZS);	
                    this.HFVB = new Big(this.TAB2[this.J] * 100);
                    this.FVBZ = new Big(this.TAB3[this.J]);
                
                }else {
                     this.VBEZB = (this.VBEZM.mul(new Big(this.ZMVB))).add(this.VBEZS);	
                     this.HFVB = new Big(this.TAB2[this.J] / 12 * this.ZMVB * 100);
                     this.FVBZ = (new Big(this.TAB3[this.J] / 12 * this.ZMVB)).round(0, RoundingMode.RoundUp);
                
                }
            
            }else {
                this.VBEZB = ((this.VBEZM.mul(this.ZAHL12)).add(this.VBEZS)).round(2, RoundingMode.RoundDown);
                this.HFVB = new Big(this.TAB2[this.J] * 100);
                this.FVBZ = new Big(this.TAB3[this.J]);
            
            }

            this.FVB = (this.VBEZB.mul(new Big(this.TAB1[this.J]))).round(0, RoundingMode.RoundUp);

            if (this.FVB.cmp(this.HFVB) == 1) {
            
                this.FVB = this.HFVB;
            
            }else {
            
            }

            this.JW = this.FVB;
            this.UPANTEIL();
            this.FVB = this.ANTEIL2;
        
        }

        if (this.ALTER1 == 0) {
        
            this.ALTE = this.ZAHL0;
        
        }else {
            if (this.AJAHR < 2006) {
            
                this.K = 1;
            
            }else {
                if (this.AJAHR < 2040) {
                
                    this.K = this.AJAHR - 2004;
                
                }else {
                    this.K = 36;
                
                }
            
            }

            this.BMG = this.RE4.sub(this.VBEZ);
            this.ALTE = (this.BMG.mul(new Big(this.TAB4[this.K]))).round(0, RoundingMode.RoundUp);
            this.JW = new Big(this.TAB5[this.K] * 100);
            this.UPANTEIL();

            if (this.ALTE.cmp(this.ANTEIL2) == 1) {
            
                this.ALTE = this.ANTEIL2;
            
            }else {
            
            }
        
        }
    }


    /**  Massgeblicher Arbeitslohn fuer die Jahreslohnsteuer 
         PAP Seite 12  */

    private MRE4() : void {

        if (this.LZZ == 1) {
        
            this.ZRE4 = this.RE4LZZ.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
            this.ZRE4VP = this.RE4LZZV.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
            this.ZVBEZ = (this.VBEZ.sub(this.FVB)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
        

        }else {
            if (this.LZZ == 2) {
            
                this.ZRE4 = ((this.RE4LZZ.add(new Big(0.67))).mul(new Big(0.12))).round(2, RoundingMode.RoundDown);
                this.ZRE4VP = ((this.RE4LZZV.add(new Big(0.67))).mul(new Big(0.12))).round(2, RoundingMode.RoundDown);
                this.ZVBEZ = ((this.VBEZ.sub(this.FVB).add(new Big(0.67))).mul(new Big(0.12))).round(2, RoundingMode.RoundDown);
            

            }else {
                if (this.LZZ == 3) {
                
                    this.ZRE4 = ((this.RE4LZZ.add(new Big(0.89))).mul(new Big(3.6/7.0))).round(2, RoundingMode.RoundDown);
                    this.ZRE4VP = ((this.RE4LZZV.add(new Big(0.89))).mul(new Big(3.6/7.0))).round(2, RoundingMode.RoundDown);
                    this.ZVBEZ = ((this.VBEZ.sub(this.FVB).add(new Big(0.89))).mul(new Big(3.6/7.0))).round(2, RoundingMode.RoundDown);
                
                }else {
                    this.ZRE4 = ((this.RE4LZZ.add(new Big(0.56))).mul(new Big(3.6))).round(2, RoundingMode.RoundDown);
                    this.ZRE4VP = ((this.RE4LZZV.add(new Big(0.56))).mul(new Big(3.6))).round(2, RoundingMode.RoundDown);
                    this.ZVBEZ = ((this.VBEZ.sub(this.FVB).add(new Big(0.56))).mul(new Big(3.6))).round(2, RoundingMode.RoundDown);
                
                }
            
            }
        
        }

        if (this.ZRE4.cmp(this.ZAHL0) == -1) {
        
            this.ZRE4 = this.ZAHL0;
        
        }else {
        
        }

        if (this.ZVBEZ.cmp(this.ZAHL0) == -1) {
        
            this.ZVBEZ = this.ZAHL0;
        
        }else {
        
        }

    }


    /**  Ermittlung der festen Tabellenfreibetraege (ohne Vorsorgepauschale)
         PAP Seite 13  */

    private MZTABFB() : void {

        this.ANP = this.ZAHL0;

        if (this.ZVBEZ.cmp(this.ZAHL0) == 1) {
        
            if (this.ZVBEZ.cmp(this.FVBZ) == -1) {
            
                /**  Fehler im PAP? double -> int, Nachkommastellen abschneiden  */
                this.FVBZ = this.ZVBEZ.round(0, RoundingMode.RoundDown);
            
            }else {
            
            }
        
        }else {
        
        }

        if (this.STKL < 6) {
        
            if (this.ZVBEZ.cmp(this.ZAHL0) == 1) {
            
                if ((this.ZVBEZ.sub(this.FVBZ)).cmp(new Big(102)) == -1) {
                
                   /**  Fehler im PAP? double -> int, Nachkommastellen abschneiden  */
                   this.ANP = (this.ZVBEZ.sub(this.FVBZ)).round(0, RoundingMode.RoundDown);
                
                }else {
                    this.ANP = new Big(102);
                
                }
            
            }else {
            
            }
        
        }else {
        
        }

        if (this.STKL < 6) {
        
            if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
            
                if ((this.ZRE4.sub(this.ZVBEZ)).cmp(new Big(920)) == -1) {
                
                    /**  Fehler im PAP? double -> int, Nachkommastellen abschneiden  */
                    this.ANP = (this.ANP.add(this.ZRE4).sub(this.ZVBEZ)).round(0, RoundingMode.RoundDown);
                
                }else {
                    this.ANP = this.ANP.add(new Big(920));
                
                }
            
            }else {
            
            }
        
        }else {
        
        }

        this.KZTAB = 1;

        if (this.STKL == 1) {
        /**  ZKF ist double und KFB ist integer. Nachkommastellen abschneiden! 4x!!!  */
        
            this.SAP = new Big(36);
            this.KFB = (this.ZKF.mul(new Big(5808))).round(0, RoundingMode.RoundDown);
        
        }else {
            if (this.STKL == 2) {
            
                this.EFA = new Big(1308);
                this.SAP = new Big(36);
                this.KFB = (this.ZKF.mul(new Big(5808))).round(0, RoundingMode.RoundDown);
            
            }else {
                if (this.STKL == 3) {
                
                    this.KZTAB = 2;
                    this.SAP = new Big(72);
                    this.KFB = (this.ZKF.mul(new Big(5808))).round(0, RoundingMode.RoundDown);
                
                }else {
                    if (this.STKL == 4) {
                    
                        this.SAP = new Big(36);
                        this.KFB = (this.ZKF.mul(new Big(2904))).round(0, RoundingMode.RoundDown);
                    
                    }else {
                        this.KFB = this.ZAHL0;
                    
                    }
                
                }
            
            }
            
        }
        this.ZTABFB = this.EFA.add(this.ANP).add(this.SAP).add(this.FVBZ);
    }


    /**  Ermittlung Jahreslohnsteuer
         PAP Seite 14  */

    private MLSTJAHR() : void {

        if (this.STKL < 5) {
        
            this.UPEVP();
        
        }else {
            this.VSP = this.ZAHL0;
        
        }

        /**  ZVE ist in EURO, ZRE4 in EURO,Cent  */
        this.ZVE = (this.ZRE4.sub(this.ZTABFB).sub(this.VSP)).round(0, RoundingMode.RoundDown);

        if (this.ZVE.cmp(this.ZAHL1) == -1) {
        
            this.ZVE = this.ZAHL0;
            this.X = this.ZAHL0;
        
        }else {
            this.X = this.ZVE.div(new Big(this.KZTAB)).round( 0, RoundingMode.RoundDown);
        
        }

        if (this.STKL < 5) {
        
            this.UPTAB05();
        
        }else {
            this.MST5_6();
        
        }

    }


    /**  Vorsorgepauschale (§39b Abs. 2 Satz 6 Nr 3 EStG) 
         PAP Seite 15  */

    private UPEVP() : void {

        if (this.KRV == 1) {
        
            this.VSP1 = this.ZAHL0;
        
        }else {

            if (this.ZRE4VP.cmp(new Big(63000)) == 1) {
            
                this.ZRE4VP = new Big(63000);
            
            }else {
            
            }

        this.VSP1 = (this.ZRE4VP.mul(new Big(0.24))).round(2, RoundingMode.RoundDown);
        this.VSP1 = (this.VSP1.mul(new Big(0.0975))).round(2, RoundingMode.RoundDown);

        
        }

        this.VSP2 = this.ZRE4VP.mul(new Big(0.11));
        this.VHB = new Big(1500 * this.KZTAB);

        if (this.VSP2.cmp(this.VHB) == 1) {
        
            this.VSP2 = this.VHB;
        
        }else {
        
        }
        /**  Erst auf 2 nachkommastellen kuerzen, dann aufrunden, sonst 
             wird die Jahreslohnsteuer ggf. um 1 EUR zu hoch angesetzt.
             Hinweis: wieder aufgehoben, da bei VSP1 eine Rundung fehlte.  */
        this.VSPN = (this.VSP1.add(this.VSP2)).round(0, RoundingMode.RoundUp);
        this.MVSP();

        if (this.VSPN.cmp(this.VSP) == 1) {		
        
            this.VSP = this.VSPN.round(2, RoundingMode.RoundDown);
        
        }else {
        
        }

    }


    /**  Vorsorgepauschale (§39b Abs. 2 Satz 6 Nr 3 EStG) Vergleichsberechnung 
         fuer Guenstigerpruefung
         PAP Seite 16  */

    private MVSP() : void {

        if (this.KENNZ == 1) {
        
           this.VSPO = this.ZRE4VP1.mul(new Big(0.2));
        
        }else {
           this.VSPO = this.ZRE4VP.mul(new Big(0.2));
        
        }

        this.VSPVOR = new Big(this.KZTAB * 3068);
        this.VSPMAX1 = new Big(this.KZTAB * 1334);
        this.VSPMAX2 = new Big(this.KZTAB * 667);
        this.VSPKURZ = new Big(this.KZTAB * 1134);

        if (this.KRV == 1) {
        
            if (this.VSPO.cmp(this.VSPKURZ) == 1) {
            
                this.VSP = this.VSPKURZ;
            
            }else {
                this.VSP = this.VSPO.round(2, RoundingMode.RoundUp);
            
            }
        
        }else {
            this.UMVSP();
        
        }

    }


    /**  Vorsorgepauschale
         PAP Seite 17  */

    private UMVSP() : void {

        if (this.KENNZ == 1) {
        
            this.VSPVOR = this.VSPVOR.sub(this.ZRE4VP1.mul(new Big(0.16)));
        
        }else {
            this.VSPVOR = this.VSPVOR.sub(this.ZRE4VP.mul(new Big(0.16)));
        
        }

        if (this.VSPVOR.cmp(this.ZAHL0) == -1) {
        
            this.VSPVOR = this.ZAHL0;
        
        }else {
        
        }

        if (this.VSPO.cmp(this.VSPVOR) == 1) {
        
            this.VSP = this.VSPVOR;
            this.VSPREST = this.VSPO.sub(this.VSPVOR);

            if (this.VSPREST.cmp(this.VSPMAX1) == 1) {
            
                this.VSP = this.VSP.add(this.VSPMAX1);
                this.VSPREST = (this.VSPREST.sub(this.VSPMAX1)).div(this.ZAHL2).round( 2, RoundingMode.RoundUp);

                if (this.VSPREST.cmp(this.VSPMAX2) == 1) {
                
                    this.VSP = (this.VSP.add(this.VSPMAX2)).round(0, RoundingMode.RoundUp);
                
                }else {
                    this.VSP = (this.VSP.add(this.VSPREST)).round(0, RoundingMode.RoundUp);
                
                }
            
            }else {
                this.VSP = (this.VSP.add(this.VSPREST)).round(0, RoundingMode.RoundUp);
            
            }
        
        }else {
            this.VSP = this.VSPO.round(0, RoundingMode.RoundUp);
        
        }

    }


    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 8 EStG)
         PAP Seite 18  */

    private MST5_6() : void {

        this.ZZX = this.X;

        if (this.ZZX.cmp(new Big(25812)) == 1) {
        
            this.ZX = new Big(25812);
            this.UP5_6();
            this.ST = (this.ST.add((this.ZZX.sub(new Big(25812))).mul(new Big(0.42)))).round(0, RoundingMode.RoundDown);
        
        }else {
            this.ZX = this.ZZX;
            this.UP5_6();

            if (this.ZZX.cmp(new Big(9144)) == 1) {
            
                this.VERGL = this.ST;
                this.ZX = new Big(9144);
                this.UP5_6();
                this.HOCH = (this.ST.add((this.ZZX.sub(new Big(9144))).mul(new Big(0.42)))).round(0, RoundingMode.RoundDown);

                if (this.HOCH.cmp(this.VERGL) == -1) {
                
                    this.ST = this.HOCH;
                
                }else {
                    this.ST = this.VERGL;
                
                }
            
            }else {
            
            }
        
        }

    }


    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 8 EStG)
         PAP Seite 18  */

    private UP5_6() : void {

        this.X = this.ZX.mul(new Big(1.25));
        this.UPTAB05();
        this.ST1 = this.ST;
        this.X = this.ZX.mul(new Big(0.75));
        this.UPTAB05();
        this.ST2 = this.ST;
        this.DIFF = (this.ST1.sub(this.ST2)).mul(this.ZAHL2);
        this.MIST = (this.ZX.mul(new Big(0.15))).round(0, RoundingMode.RoundDown);

        if (this.MIST.cmp(this.DIFF) == 1) {
        
            this.ST = this.MIST;
        
        }else {
            this.ST = this.DIFF;
        
        }

    }


    /**  Solidaritaetszuschlag
         PAP Seite 19  */

    private MSOLZ() : void {

        this.SOLZFREI = new Big(972 * this.KZTAB);

        if (this.JBMG.cmp(this.SOLZFREI) == 1) {
        
            this.SOLZJ = (this.JBMG.mul(new Big(5.5/100))).round(2, RoundingMode.RoundDown);
            this.SOLZMIN = (this.JBMG.sub(this.SOLZFREI)).mul(new Big(20.0/100.0));

            if (this.SOLZMIN.cmp(this.SOLZJ) == -1) {
            
                this.SOLZJ = this.SOLZMIN;
            
            }else {
            
            }

            this.JW = this.SOLZJ.mul(this.ZAHL100).round(0, RoundingMode.RoundDown);
            this.UPANTEIL();
            this.SOLZLZZ = this.ANTEIL1;
        
        }else {
            this.SOLZLZZ = this.ZAHL0;
        
        }

        if (this.R > 0) {
        
            this.JW = this.JBMG.mul(this.ZAHL100);
            this.UPANTEIL();
            this.BK = this.ANTEIL1;
        
        }else {
            this.BK = this.ZAHL0;
        
        }

    }



    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 10 EStG)
         PAP Seite 20  */

    private UPANTEIL() : void {

        if (this.LZZ == 1) {
        
            this.ANTEIL1 = this.JW;
            this.ANTEIL2 = this.JW;
        
        }else {

            if (this.LZZ == 2) {
            
                this.ANTEIL1 = this.JW.div(this.ZAHL12).round( 0, RoundingMode.RoundDown);
                this.ANTEIL2 = this.JW.div(this.ZAHL12).round( 0, RoundingMode.RoundUp);
            
            }else {

                if (this.LZZ == 3) {
                
                    this.ANTEIL1 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round( 0, RoundingMode.RoundDown);
                    this.ANTEIL2 = (this.JW.mul(this.ZAHL7)).div(this.ZAHL360).round( 0, RoundingMode.RoundUp);
                
                }else {
                    this.ANTEIL1 = this.JW.div(this.ZAHL360).round( 0, RoundingMode.RoundDown);
                    this.ANTEIL2 = this.JW.div(this.ZAHL360).round( 0, RoundingMode.RoundUp);
                
                }
            
            }
        
        }

    }



    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 7 EStG)
         PAP Seite 21  */

    private MSONST() : void {

        if (this.SONSTB.cmp(this.ZAHL0) == 1) {
        
            this.LZZ = 1;
            this.VBEZ = this.JVBEZ;
            this.RE4 = this.JRE4;
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.MLSTJAHR();
            this.LST1 = this.ST.mul(this.ZAHL100);
            this.VBEZ = this.JVBEZ.add(this.VBS);
            this.RE4 = this.JRE4.add(this.SONSTB);
            this.VBEZS = this.VBEZS.add(this.STERBE);
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.MLSTJAHR();
            this.LST2 = this.ST.mul(this.ZAHL100);
            this.STS = this.LST2.sub(this.LST1);
            this.SOLZS = this.STS.mul(new Big(5.5)).div(this.ZAHL100).round( 0, RoundingMode.RoundDown);

            if (this.R > 0) {
            
                this.BKS = this.STS;
            
            }else {
                this.BKS = this.ZAHL0;
            
            }
        
        }else {
            this.STS = this.ZAHL0;
            this.SOLZS = this.ZAHL0;
            this.BKS = this.ZAHL0;
        
        }

    }



    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 7 EStG)
         PAP Seite 21  */

    private MRE4LZZ2() : void {

        this.RE4LZZ = this.RE4.sub(this.FVB).sub(this.ALTE).sub(this.JFREIB).add(this.JHINZU);
        this.RE4LZZV = this.RE4.sub(this.FVB).sub(this.ALTE);
        this.MRE4();
        this.MZTABFB();

    }



    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 EStG)
         PAP Seite 22  */

    private MVMT() : void {

        if ((this.VMT.add(this.VKAPA)).cmp(this.ZAHL0) == 1) {
        
            this.LZZ = 1;
            this.VBEZ = this.JVBEZ.add(this.VBS);
            this.RE4 = this.JRE4.add(this.SONSTB);
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.MLSTJAHR();
            this.LST1 = this.ST.mul(this.ZAHL100);
            this.VMT = this.VMT.add(this.VKAPA);
            this.VBEZS = this.VBEZS.add(this.VKAPA);
            this.VBEZ = this.VBEZ.add(this.VKAPA);
            this.RE4 = this.JRE4.add(this.SONSTB).add(this.VMT);
            this.MRE4LZZ();
            this.MRE4LZZ2();
            this.KENNZ = 1;
            this.ZRE4VP1 = this.ZRE4VP;
            this.MLSTJAHR();
            this.LST3 = this.ST.mul(this.ZAHL100);
            this.VBEZ = this.VBEZ.sub(this.VKAPA);
            this.RE4 = this.JRE4.add(this.SONSTB);
            this.MRE4LZZ();

            if ((this.RE4.sub(this.JFREIB).add(this.JHINZU)).cmp(this.ZAHL0) == -1) {
            
                this.RE4 = this.RE4.sub(this.JFREIB).add(this.JHINZU);
                this.JFREIB = this.ZAHL0;
                this.JHINZU = this.ZAHL0;
                this.RE4 = (this.RE4.add(this.VMT)).div(this.ZAHL5).round( 0, RoundingMode.RoundDown);
                this.MRE4LZZ2();
                this.MLSTJAHR();
                this.LST2 = this.ST.mul(this.ZAHL100);
                this.STV = this.LST2.mul(this.ZAHL5);
            
            }else {
                this.RE4 = this.RE4.add(this.VMT.div(this.ZAHL5).round( 0, RoundingMode.RoundDown));
                this.MRE4LZZ2();
                this.MLSTJAHR();
                this.LST2 = this.ST.mul(this.ZAHL100);
                this.STV = (this.LST2.sub(this.LST1)).mul(this.ZAHL5);
            
            }

            this.LST3 = this.LST3.sub(this.LST1);

            if (this.LST3.cmp(this.STV) == -1) {
            
                this.STV = this.LST3;
            
            }else {
            
            }

            this.SOLZV = (this.STV.mul(new Big(5.5))).div(this.ZAHL100).round( 0, RoundingMode.RoundDown);

            if (this.R > 0) {
            
                this.BKV = this.STV;
            
            }else {
                this.BKV = this.ZAHL0;
            
            }
        
        }else {
            this.STV = this.ZAHL0;
            this.SOLZV = this.ZAHL0;
            this.BKV = this.ZAHL0;
        
        }

    }


    /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 EStG)
         PAP Seite 23  */

    private UPTAB05() : void {

        if (this.X.cmp(new Big(7665)) == -1) {
        
            this.ST = this.ZAHL0; 
        
        }else {

            if (this.X.cmp(new Big(12740)) == -1) {
            
                this.Y = (this.X.sub(new Big(7664))).div(new Big(10000)).round( 6, RoundingMode.RoundDown);
                this.RW = this.Y.mul(new Big(883.74));
                this.RW = this.RW.add(new Big(1500));
                this.ST = (this.RW.mul(this.Y)).round(0, RoundingMode.RoundDown);
            
            }else {

            if (this.X.cmp(new Big(52152)) == -1) {
            
                this.Y = (this.X.sub(new Big(12739))).div(new Big(10000)).round( 6, RoundingMode.RoundDown);
                this.RW = this.Y.mul(new Big(228.74));
                this.RW = this.RW.add(new Big(2397));
                this.RW = this.RW.mul(this.Y);
                this.ST = (this.RW.add(new Big(989))).round(0, RoundingMode.RoundDown);
            
            }else {
                this.ST = ((this.X.mul(new Big(0.42))).sub(new Big(7914))).round(0, RoundingMode.RoundDown);
            
            }
            
        }
        
        }

        this.ST = this.ST.mul(new Big(this.KZTAB));

    }

    
	/**
	 * Getter for AJAHR.
	 * <p>
	 *  Auf die Vollendung des 64. Lebensjahres folgende 
             Kalenderjahr (erforderlich, wenn ALTER1=1) 
	 * <p>
	 * @return the value
	 */
	public getAJAHR() : number {
		return this.AJAHR;
    }
    
    /**
     * Setter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende 
             Kalenderjahr (erforderlich, wenn ALTER1=1) 
     * <p>
     * @param {number} AJAHR input value 
     */
	public setAJAHR( AJAHR : number) : void {
		this.AJAHR = AJAHR;
    }
    
	/**
	 * Getter for ALTER1.
	 * <p>
	 *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem 
             der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0 
	 * <p>
	 * @return the value
	 */
	public getALTER1() : number {
		return this.ALTER1;
    }
    
    /**
     * Setter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem 
             der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0 
     * <p>
     * @param {number} ALTER1 input value 
     */
	public setALTER1( ALTER1 : number) : void {
		this.ALTER1 = ALTER1;
    }
    
	/**
	 * Getter for HINZUR.
	 * <p>
	 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents 
	 * <p>
	 * @return the value
	 */
	public getHINZUR() : Big {
		return this.HINZUR;
    }
    
    /**
     * Setter for HINZUR.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
             fuer den Lohnzahlungszeitraum in Cents 
     * <p>
     * @param {Big} HINZUR input value 
     */
	public setHINZUR( HINZUR : Big) : void {
		this.HINZUR = HINZUR;
    }
    
	/**
	 * Getter for JFREIB.
	 * <p>
	 *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getJFREIB() : Big {
		return this.JFREIB;
    }
    
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag nach Ma&szlig;gabe der Eintragungen auf der
             Lohnsteuerkarte in Cents (ggf. 0) 
     * <p>
     * @param {Big} JFREIB input value 
     */
	public setJFREIB( JFREIB : Big) : void {
		this.JFREIB = JFREIB;
    }
    
	/**
	 * Getter for JHINZU.
	 * <p>
	 *  Jahreshinzurechnungsbetrag in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getJHINZU() : Big {
		return this.JHINZU;
    }
    
    /**
     * Setter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag in Cents (ggf. 0) 
     * <p>
     * @param {Big} JHINZU input value 
     */
	public setJHINZU( JHINZU : Big) : void {
		this.JHINZU = JHINZU;
    }
    
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
	public getJRE4() : Big {
		return this.JRE4;
    }
    
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
	public setJRE4( JRE4 : Big) : void {
		this.JRE4 = JRE4;
    }
    
	/**
	 * Getter for JVBEZ.
	 * <p>
	 *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getJVBEZ() : Big {
		return this.JVBEZ;
    }
    
    /**
     * Setter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0) 
     * <p>
     * @param {Big} JVBEZ input value 
     */
	public setJVBEZ( JVBEZ : Big) : void {
		this.JVBEZ = JVBEZ;
    }
    
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
	public getKRV() : number {
		return this.KRV;
    }
    
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
	public setKRV( KRV : number) : void {
		this.KRV = KRV;
    }
    
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
	public getLZZ() : number {
		return this.LZZ;
    }
    
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
	public setLZZ( LZZ : number) : void {
		this.LZZ = LZZ;
    }
    
	/**
	 * Getter for R.
	 * <p>
	 *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0) 
	 * <p>
	 * @return the value
	 */
	public getR() : number {
		return this.R;
    }
    
    /**
     * Setter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. Lohnsteuerkarte (bei
             keiner Religionszugehoerigkeit = 0) 
     * <p>
     * @param {number} R input value 
     */
	public setR( R : number) : void {
		this.R = R;
    }
    
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
	public getRE4() : Big {
		return this.RE4;
    }
    
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
	public setRE4( RE4 : Big) : void {
		this.RE4 = RE4;
    }
    
	/**
	 * Getter for SONSTB.
	 * <p>
	 *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich 
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen, 
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getSONSTB() : Big {
		return this.SONSTB;
    }
    
    /**
     * Setter for SONSTB.
     * <p>
     *  Sonstige Bezuege (ohne Verguetung aus mehrjaehriger Taetigkeit) einschliesslich 
             Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen, 
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt in Cents (ggf. 0) 
     * <p>
     * @param {Big} SONSTB input value 
     */
	public setSONSTB( SONSTB : Big) : void {
		this.SONSTB = SONSTB;
    }
    
	/**
	 * Getter for STERBE.
	 * <p>
	 *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen, 
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt 
             (in SONSTB enthalten) in Cents 
	 * <p>
	 * @return the value
	 */
	public getSTERBE() : Big {
		return this.STERBE;
    }
    
    /**
     * Setter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen, 
             soweit es sich nicht um Bezuege fuer mehrere Jahre handelt 
             (in SONSTB enthalten) in Cents 
     * <p>
     * @param {Big} STERBE input value 
     */
	public setSTERBE( STERBE : Big) : void {
		this.STERBE = STERBE;
    }
    
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
	public getSTKL() : number {
		return this.STKL;
    }
    
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
	public setSTKL( STKL : number) : void {
		this.STKL = STKL;
    }
    
	/**
	 * Getter for VBEZ.
	 * <p>
	 *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getVBEZ() : Big {
		return this.VBEZ;
    }
    
    /**
     * Setter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezuege in Cents (ggf. 0) 
     * <p>
     * @param {Big} VBEZ input value 
     */
	public setVBEZ( VBEZ : Big) : void {
		this.VBEZ = VBEZ;
    }
    
	/**
	 * Getter for VBEZM.
	 * <p>
	 *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
             in Cents
	 * <p>
	 * @return the value
	 */
	public getVBEZM() : Big {
		return this.VBEZM;
    }
    
    /**
     * Setter for VBEZM.
     * <p>
     *  Vorsorgungsbezug im Januar 2005 bzw. fuer den ersten vollen Monat
             in Cents
     * <p>
     * @param {Big} VBEZM input value 
     */
	public setVBEZM( VBEZM : Big) : void {
		this.VBEZM = VBEZM;
    }
    
	/**
	 * Getter for VBEZS.
	 * <p>
	 *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns 
             bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen 
             bei Versorgungsbezuegen in Cents
	 * <p>
	 * @return the value
	 */
	public getVBEZS() : Big {
		return this.VBEZS;
    }
    
    /**
     * Setter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen im Kalenderjahr des Versorgungsbeginns 
             bei Versorgungsempfaengern ohne Sterbegeld, Kapitalauszahlungen/Abfindungen 
             bei Versorgungsbezuegen in Cents
     * <p>
     * @param {Big} VBEZS input value 
     */
	public setVBEZS( VBEZS : Big) : void {
		this.VBEZS = VBEZS;
    }
    
	/**
	 * Getter for VBS.
	 * <p>
	 *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld 
            in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getVBS() : Big {
		return this.VBS;
    }
    
    /**
     * Setter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld 
            in Cents (ggf. 0) 
     * <p>
     * @param {Big} VBS input value 
     */
	public setVBS( VBS : Big) : void {
		this.VBS = VBS;
    }
    
	/**
	 * Getter for VJAHR.
	 * <p>
	 *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden 
             mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug 
	 * <p>
	 * @return the value
	 */
	public getVJAHR() : number {
		return this.VJAHR;
    }
    
    /**
     * Setter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewaehrt wurde; werden 
             mehrere Versorgungsbezuege gezahlt, so gilt der aelteste erstmalige Bezug 
     * <p>
     * @param {number} VJAHR input value 
     */
	public setVJAHR( VJAHR : number) : void {
		this.VJAHR = VJAHR;
    }
    
	/**
	 * Getter for VKAPA.
	 * <p>
	 *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getVKAPA() : Big {
		return this.VKAPA;
    }
    
    /**
     * Setter for VKAPA.
     * <p>
     *  Kapitalauszahlungen/Abfindungen bei Versorgungsbezuegen fuer mehrere Jahre in Cents (ggf. 0) 
     * <p>
     * @param {Big} VKAPA input value 
     */
	public setVKAPA( VKAPA : Big) : void {
		this.VKAPA = VKAPA;
    }
    
	/**
	 * Getter for VMT.
	 * <p>
	 *  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei 
             Versorgungsbezuegen in Cents (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getVMT() : Big {
		return this.VMT;
    }
    
    /**
     * Setter for VMT.
     * <p>
     *  Verguetung fuer mehrjaehrige Taetigkeit ohne Kapitalauszahlungen/Abfindungen bei 
             Versorgungsbezuegen in Cents (ggf. 0) 
     * <p>
     * @param {Big} VMT input value 
     */
	public setVMT( VMT : Big) : void {
		this.VMT = VMT;
    }
    
	/**
	 * Getter for WFUNDF.
	 * <p>
	 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents 
	 * <p>
	 * @return the value
	 */
	public getWFUNDF() : Big {
		return this.WFUNDF;
    }
    
    /**
     * Setter for WFUNDF.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag
             fuer den Lohnzahlungszeitraum in Cents 
     * <p>
     * @param {Big} WFUNDF input value 
     */
	public setWFUNDF( WFUNDF : Big) : void {
		this.WFUNDF = WFUNDF;
    }
    
	/**
	 * Getter for ZKF.
	 * <p>
	 *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
             I, II, III und IV) 
	 * <p>
	 * @return the value
	 */
	public getZKF() : Big {
		return this.ZKF;
    }
    
    /**
     * Setter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
             I, II, III und IV) 
     * <p>
     * @param {Big} ZKF input value 
     */
	public setZKF( ZKF : Big) : void {
		this.ZKF = ZKF;
    }
    
	/**
	 * Getter for ZMVB.
	 * <p>
	 *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
             erforderlich bei Jahresberechnung (LZZ = 1) 
	 * <p>
	 * @return the value
	 */
	public getZMVB() : number {
		return this.ZMVB;
    }
    
    /**
     * Setter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
             erforderlich bei Jahresberechnung (LZZ = 1) 
     * <p>
     * @param {number} ZMVB input value 
     */
	public setZMVB( ZMVB : number) : void {
		this.ZMVB = ZMVB;
    }
    
	/**
	 * Getter for BK.
	 * <p>
	 *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents 
	 * <p>
	 * @return the value
	 */
	public getBK() : Big {
		return this.BK;
    }
    
	/**
	 * Getter for BKS.
	 * <p>
	 *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents 
	 * <p>
	 * @return the value
	 */
	public getBKS() : Big {
		return this.BKS;
    }
    
	/**
	 * Getter for BKV.
	 * <p>
	 *  Bemessungsgrundlage der sonstigen Einkuenfte (ohne Verguetung
             fuer mehrjaehrige Taetigkeit) fuer die Kirchenlohnsteuer in Cents 
	 * <p>
	 * @return the value
	 */
	public getBKV() : Big {
		return this.BKV;
    }
    
	/**
	 * Getter for LSTLZZ.
	 * <p>
	 *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents 
	 * <p>
	 * @return the value
	 */
	public getLSTLZZ() : Big {
		return this.LSTLZZ;
    }
    
	/**
	 * Getter for SOLZLZZ.
	 * <p>
	 *  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
             in Cents 
	 * <p>
	 * @return the value
	 */
	public getSOLZLZZ() : Big {
		return this.SOLZLZZ;
    }
    
	/**
	 * Getter for SOLZS.
	 * <p>
	 *  Solidaritaetszuschlag fuer sonstige Bezuege (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents 
	 * <p>
	 * @return the value
	 */
	public getSOLZS() : Big {
		return this.SOLZS;
    }
    
	/**
	 * Getter for SOLZV.
	 * <p>
	 *  Solidaritaetszuschlag fuer die Verguetung fuer mehrjaehrige Taetigkeit in
             Cents 
	 * <p>
	 * @return the value
	 */
	public getSOLZV() : Big {
		return this.SOLZV;
    }
    
	/**
	 * Getter for STS.
	 * <p>
	 *  Lohnsteuer fuer sonstige Einkuenfte (ohne Verguetung fuer mehrjaehrige
             Taetigkeit) in Cents 
	 * <p>
	 * @return the value
	 */
	public getSTS() : Big {
		return this.STS;
    }
    
	/**
	 * Getter for STV.
	 * <p>
	 *  Lohnsteuer fuer Verguetung fuer mehrjaehrige Taetigkeit in Cents 
	 * <p>
	 * @return the value
	 */
	public getSTV() : Big {
		return this.STV;
    }
    
	/**
	 * Initialize all inputs values with zero.
	 */
	public initInputs() : void {
		
		this.AJAHR = 0;
		
		this.ALTER1 = 0;
		
		this.HINZUR = this.Z_0;
		
		this.JFREIB = this.Z_0;
		
		this.JHINZU = this.Z_0;
		
		this.JRE4 = this.Z_0;
		
		this.JVBEZ = this.Z_0;
		
		this.KRV = 0;
		
		this.LZZ = 0;
		
		this.R = 0;
		
		this.RE4 = this.Z_0;
		
		this.SONSTB = this.Z_0;
		
		this.STERBE = this.Z_0;
		
		this.STKL = 0;
		
		this.VBEZ = this.Z_0;
		
		this.VBEZM = this.Z_0;
		
		this.VBEZS = this.Z_0;
		
		this.VBS = this.Z_0;
		
		this.VJAHR = 0;
		
		this.VKAPA = this.Z_0;
		
		this.VMT = this.Z_0;
		
		this.WFUNDF = this.Z_0;
		
		this.ZKF = this.Z_0;
		
		this.ZMVB = 0;
		
	}
	
	/**
	 * Setter for all input parameters with type Big.
	 * 
	 * @param {String} name Variable name to set.
	 * @param {Big} value Value to set.
	 */
	public setBig(name: String, value : Big) : void {
		switch(name) {
		case 'HINZUR': this.HINZUR = value; break;
			case 'JFREIB': this.JFREIB = value; break;
			case 'JHINZU': this.JHINZU = value; break;
			case 'JRE4': this.JRE4 = value; break;
			case 'JVBEZ': this.JVBEZ = value; break;
			case 'RE4': this.RE4 = value; break;
			case 'SONSTB': this.SONSTB = value; break;
			case 'STERBE': this.STERBE = value; break;
			case 'VBEZ': this.VBEZ = value; break;
			case 'VBEZM': this.VBEZM = value; break;
			case 'VBEZS': this.VBEZS = value; break;
			case 'VBS': this.VBS = value; break;
			case 'VKAPA': this.VKAPA = value; break;
			case 'VMT': this.VMT = value; break;
			case 'WFUNDF': this.WFUNDF = value; break;
			case 'ZKF': this.ZKF = value; break;
			
			default:
				throw new Error("Unknown Big parameter " + name);
		}
	}

	/**
	 * Setter for all input parameters with type number.
	 *
	 * @param {String} name Variable name to set.
	 * @param {Big} value Value to set.
	 */
	public setNumber(name: String, value : number) : void {
		switch(name) {
		case 'AJAHR': this.AJAHR = value; break;
			case 'ALTER1': this.ALTER1 = value; break;
			case 'KRV': this.KRV = value; break;
			case 'LZZ': this.LZZ = value; break;
			case 'R': this.R = value; break;
			case 'STKL': this.STKL = value; break;
			case 'VJAHR': this.VJAHR = value; break;
			case 'ZMVB': this.ZMVB = value; break;
			
			default:
				throw new Error("Unknown number parameter " + name);
		}
	}
	
	/**
	 * Getter for all output parameters with type Big.
	 *
	 * @param {String} name Variable name to get.
	 */
	public getBig(name: String) : Big {
		switch(name) {
		case 'BK': return this.BK;
			case 'BKS': return this.BKS;
			case 'BKV': return this.BKV;
			case 'LSTLZZ': return this.LSTLZZ;
			case 'SOLZLZZ': return this.SOLZLZZ;
			case 'SOLZS': return this.SOLZS;
			case 'SOLZV': return this.SOLZV;
			case 'STS': return this.STS;
			case 'STV': return this.STV;
			
			default:
				throw new Error("Unknown Big parameter " + name);
		}
	}

	/**
	 * Getter for all output parameters with type number.
	 *
	 * @param {String} name Variable name to get.
	 */
	public getNumber(name: String) : number {
		switch(name) {
		
			default:
				throw new Error("Unknown number parameter " + name);
		}
	}

	/**
	 * Get all input names.
	 */
	public getInputs() : String[] {
		return [
			"AJAHR","ALTER1","HINZUR","JFREIB","JHINZU","JRE4","JVBEZ","KRV","LZZ","R","RE4","SONSTB","STERBE","STKL","VBEZ","VBEZM","VBEZS","VBS","VJAHR","VKAPA","VMT","WFUNDF","ZKF","ZMVB",
		];
	}

	/**
	 * Get all output names.
	 */
	public getOutputs() : String[] {
		return [
			"BK","BKS","BKV","LSTLZZ","SOLZLZZ","SOLZS","SOLZV","STS","STV",
		];
	}
	
}
    