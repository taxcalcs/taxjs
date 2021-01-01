
import Big, { RoundingMode } from 'big.js';

/**
* Steuerberechnungsklasse.
* 
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
* 
*/
export class Lohnsteuer2020Big implements TaxJs {
    private readonly Z_0 : Big = new Big(0);
    private readonly Z_1 : Big = new Big(1);
	private readonly Z_10 : Big = new Big(10);
     
		/**  Stand: 2019-11-29  */
		/**  ITZBund Düsseldorf */ 

   		 /**   EINGABEPARAMETER   */
        
            /**  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)  */
	        private af : number = 1;
	
	        /**  Auf die Vollendung des 64. Lebensjahres folgende
	             Kalenderjahr (erforderlich, wenn ALTER1=1)  */
	        private AJAHR : number;
	
	        /**  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
	             der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0  */
	        private ALTER1 : number;
	
	        /**  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent  */
	        private ENTSCH : Big = this.Z_0;
	
	        /**  eingetragener Faktor mit drei Nachkommastellen  */
	        private f : number = 1.0;
	
	        /**  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
	             Lohnsteuerkarte in Cents (ggf. 0)  */
	        private JFREIB : Big;
	
	        /**  Jahreshinzurechnungsbetrag in Cents (ggf. 0)  */
	        private JHINZU : Big;
	
	        /**  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent. 
	             Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB) 
	             oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
	             Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem 
	             voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen 
	             Abrechnungszeitraum sind in voller Höhe hinzuzurechnen.  */ 
	        private JRE4 : Big;
	 
	        /**  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
	        private JVBEZ : Big;
	
			/** Merker für die Vorsorgepauschale
				2 = der Arbeitnehmer ist NICHT in der gesetzlichen Rentenversicherung versichert.
				
				1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die 
					Beitragsbemessungsgrenze OST.
					
				0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die 
					Beitragsbemessungsgrenze WEST.  */
	        private KRV : number;
	
			/**  Einkommensbezogener Zusatzbeitragssatz eines gesetzlich krankenversicherten Arbeitnehmers, 
			 auf dessen Basis der an die Krankenkasse zu zahlende Zusatzbeitrag berechnet wird,
			 in Prozent (bspw. 0,90 für 0,90 %) mit 2 Dezimalstellen. 
			 Der von der Kranken-kasse festgesetzte Zusatzbeitragssatz ist bei Abweichungen unmaßgeblich.  */
			private KVZ : Big;
	
	        /**  Lohnzahlungszeitraum:
	             1 = Jahr
	             2 = Monat
	             3 = Woche
	             4 = Tag  */
	        private LZZ : number;
	
	        /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
	             den Lohnzahlungszeitraum in Cent  */
	        private LZZFREIB : Big;
	
	        /**  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
	             für den Lohnzahlungszeitraum in Cent  */
	        private LZZHINZU : Big;
	
	        /**  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
	             Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
	             als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer 
	             als Monatsbetrag anzugeben). */
	        private PKPV : Big = this.Z_0;
	        
	        /**  Krankenversicherung:
	             0 = gesetzlich krankenversicherte Arbeitnehmer
	             1 = ausschließlich privat krankenversicherte Arbeitnehmer OHNE Arbeitgeberzuschuss
	             2 = ausschließlich privat krankenversicherte Arbeitnehmer MIT Arbeitgeberzuschuss  */
	        private PKV : number = 0;
	        
	        /**  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw. 
	        	 	zu berücksichtigen wären, sonst 0.  */
	        private PVS : number = 0;
	
	        /**  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung 
	        	 	zu zahlen hat, sonst 0.  */
	        private PVZ : number = 0;
	        
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
	
	        /**  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen 
	             für mehrere Jahre in Cent (ggf. 0)  */     
	        private VKAPA : Big;
	 
			/**  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen 
				 bei Versorgungsbezügen in Cent (ggf. 0)  */
	        private VMT : Big;
	
	        /**  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
	             I, II, III und IV)  */
	        private ZKF : Big;
	
	        /**  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden (nur
	             erforderlich bei Jahresberechnung (LZZ = 1)  */
	        private ZMVB : number;
	        
	        /**  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent  */
	    	private JRE4ENT : Big = this.Z_0;
	    	
	    	/**  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent  */
	    	private SONSTENT : Big = this.Z_0;
    	

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
	        
	        /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
				 privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
				 die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
				 steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
				 steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
				 VKVSONST  */
			private VKVLZZ : Big = this.Z_0; 
			
			/**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers 
				 zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. 
				 auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
				 auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen für mehrjährige 
				 Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.  */
			private VKVSONST : Big = this.Z_0; 
		
		
		
		/**   AUSGABEPARAMETER DBA   */
		
		
			/**  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent  */
			private VFRB : Big = this.Z_0; 
			
			/**  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
			private VFRBS1 : Big = this.Z_0; 
			
			/**  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent  */
			private VFRBS2 : Big = this.Z_0; 
			
			/**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über 
				dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent  */
			private WVFRB : Big = this.Z_0; 
			
			/**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag 
				bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
			private WVFRBO : Big = this.Z_0; 
			
			/**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE 
				über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent  */
			private WVFRBM : Big = this.Z_0; 
		

	    /**   INTERNE FELDER   */
		
		        /**  Altersentlastungsbetrag nach Alterseinkünftegesetz in €,
		             Cent (2 Dezimalstellen)  */
		        private ALTE : Big = this.Z_0;
		
		        /**  Arbeitnehmer-Pauschbetrag in EURO  */
		        private ANP : Big = this.Z_0;
		
		        /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
		             auf ganze Cents abgerundet  */
		        private ANTEIL1 : Big = this.Z_0;
		
		        /**  Bemessungsgrundlage für Altersentlastungsbetrag in €, Cent
		             (2 Dezimalstellen)  */
		        private BMG : Big = this.Z_0;
		        
		        /**  Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung 
		        	und der sozialen Pflegeversicherung in Euro  */
		        private BBGKVPV : Big = this.Z_0;
		        /**   Nach Programmablaufplan 2019  */
		        private bd : Big = this.Z_0;
		        /**  allgemeine Beitragsbemessungsgrenze in der allgemeinen Renten-versicherung in Euro  */
		        private BBGRV : Big = this.Z_0;
		
		        /**  Differenz zwischen ST1 und ST2 in EURO  */
		        private DIFF : Big = this.Z_0;
		
		        /**  Entlastungsbetrag fuer Alleinerziehende in EURO  */
		        private EFA : Big = this.Z_0;
		
		        /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen)  */
		        private FVB : Big = this.Z_0;
		
		        /**  Versorgungsfreibetrag in €, Cent (2 Dezimalstellen) für die Berechnung
		             der Lohnsteuer für den sonstigen Bezug  */
			    private FVBSO : Big = this.Z_0;
		
		        /**  Zuschlag zum Versorgungsfreibetrag in EURO  */
		        private FVBZ : Big = this.Z_0;
		
		        /**  Zuschlag zum Versorgungsfreibetrag in EURO fuer die Berechnung
		             der Lohnsteuer beim sonstigen Bezug  */
			    private FVBZSO : Big = this.Z_0;
		 
		     	/**  Grundfreibetrag in Euro  */
		        private GFB : Big = this.Z_0;
		 
		        /**  Maximaler Altersentlastungsbetrag in €  */
		        private HBALTE : Big = this.Z_0;
		
		        /**  Massgeblicher maximaler Versorgungsfreibetrag in €  */
		        private HFVB : Big = this.Z_0;
		
		        /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €,Cent
		             (2 Dezimalstellen)  */
		        private HFVBZ : Big = this.Z_0;
		
		        /**  Massgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in €, Cent
		             (2 Dezimalstellen) für die Berechnung der Lohnsteuer für den
		             sonstigen Bezug  */
		        private HFVBZSO : Big = this.Z_0;
				
		         /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
		        private J : number = 0;
		
		        /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
		             Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in EURO  */
		        private JBMG : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechneter LZZFREIB in €, Cent
		             (2 Dezimalstellen)  */
		        private JLFREIB : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechnete LZZHINZU in €, Cent
		             (2 Dezimalstellen)  */
		        private JLHINZU : Big = this.Z_0;
		
		        /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
		             UPANTEIL errechnet werden soll in Cents  */
		        private JW : Big = this.Z_0;
		        
		        /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
		        private K : number = 0;
		
		        /**  Merker für Berechnung Lohnsteuer für mehrjährige Tätigkeit.
					 0 = normale Steuerberechnung
					 1 = Steuerberechnung für mehrjährige Tätigkeit
					 2 = entfällt  */     
		        private KENNVMT : number = 0;
		 
		        /**  Summe der Freibetraege fuer Kinder in EURO  */
		        private KFB : Big = this.Z_0;
		
		        /**  Beitragssatz des Arbeitgebers zur Krankenversicherung  */
		        private KVSATZAG : Big = this.Z_0;
		
		        /**  Beitragssatz des Arbeitnehmers zur Krankenversicherung  */
		        private KVSATZAN : Big = this.Z_0;
		
		       /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
		             1 = Grundtabelle
		             2 = Splittingtabelle  */
		        private KZTAB : number = 0;
		
		        /**  Jahreslohnsteuer in EURO  */
		        private LSTJAHR : Big = this.Z_0;
		
		        /**  Zwischenfelder der Jahreslohnsteuer in Cent  */
		        private LST1 : Big = this.Z_0;
		        private LST2 : Big = this.Z_0;
		        private LST3 : Big = this.Z_0;
		        private LSTOSO : Big = this.Z_0;
		        private LSTSO : Big = this.Z_0;
		
		        /**  Mindeststeuer fuer die Steuerklassen V und VI in EURO  */
		        private MIST : Big = this.Z_0;
		
		        /**  Beitragssatz des Arbeitgebers zur Pflegeversicherung  */
		        private PVSATZAG : Big = this.Z_0;
		
		        /**  Beitragssatz des Arbeitnehmers zur Pflegeversicherung  */
		        private PVSATZAN : Big = this.Z_0;
		
				/**  Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)   */
			    private RVSATZAN : Big = this.Z_0;
		
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
		 
				/**  Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehrjährige Tätigkeit  */
		        private STOVMT : Big = this.Z_0;
		        
		        /**  Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung (2 Dezimalstellen)  */
		        private TBSVORV : Big = this.Z_0;
		 
		        /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cents  */
		        private VBEZB : Big = this.Z_0;
		
		        /**  Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für
		             den sonstigen Bezug  */
		        private VBEZBSO : Big = this.Z_0;
		
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
				
				/**  Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und 
					 soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die
					 private Basiskrankenversicherung und private Pflege-Pflichtversicherung 
					 in Euro, Cent (2 Dezimalstellen)  */
		        private VSP3 : Big = this.Z_0;
		        
		        /**  Erster Grenzwert in Steuerklasse V/VI in Euro  */
		        private W1STKL5 : Big = this.Z_0; 
		        
		        /**  Zweiter Grenzwert in Steuerklasse V/VI in Euro  */
		        private W2STKL5 : Big = this.Z_0; 
		        
		        /**  Dritter Grenzwert in Steuerklasse V/VI in Euro  */
		        private W3STKL5 : Big = this.Z_0;
		
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
		
		        /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG €, C
		             (2 Dezimalstellen)  */
		        private X : Big = this.Z_0;
		
		        /**  gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
		        private Y : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
		             nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4.  */
		        private ZRE4 : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)  */
		        private ZRE4J : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
		             nach Abzug des Versorgungsfreibetrags und des Alterentlastungsbetrags
		             zur Berechnung der Vorsorgepauschale in €, Cent (2 Dezimalstellen)  */
		        private ZRE4VP : Big = this.Z_0;
		
		        /**  Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in €, Cent
		             (2 Dezimalstellen)  */
		        private ZTABFB : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechnetes (VBEZ abzueglich FVB) in
		             EURO, C (2 Dezimalstellen)  */
		        private ZVBEZ : Big = this.Z_0;
		
		        /**  Auf einen Jahreslohn hochgerechnetes VBEZ in €, C (2 Dezimalstellen)  */
		        private ZVBEZJ : Big = this.Z_0;
		
		        /**  Zu versteuerndes Einkommen in €, C (2 Dezimalstellen)  */
		        private ZVE : Big = this.Z_0;
		        
		        /**  Zwischenfelder zu X fuer die Berechnung der Steuer nach § 39b
		             Abs. 2 Satz 7 EStG in €  */
		        private ZX : Big = this.Z_0;
		        private ZZX : Big = this.Z_0;
		        private HOCH : Big = this.Z_0;
		        private VERGL : Big = this.Z_0;
				
				 /**  Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und 
					  privaten Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale) in Cent.  */
		        private VKV : Big = this.Z_0;
			
    
        /**  Tabelle fuer die Vomhundertsaetze des Versorgungsfreibetrags  */
        private readonly TAB1 : Big[] = [new Big (0.0), new Big (0.4), new Big (0.384), new Big (0.368),                  new Big (0.352), new Big (0.336), new Big (0.32), new Big (0.304),                  new Big (0.288), new Big (0.272), new Big (0.256), new Big (0.24),                   new Big (0.224), new Big (0.208), new Big (0.192), new Big (0.176),                  new Big (0.16), new Big (0.152),  new Big (0.144), new Big (0.136),                  new Big (0.128), new Big (0.12),  new Big (0.112), new Big (0.104),                  new Big (0.096), new Big (0.088), new Big (0.08), new Big (0.072),                  new Big (0.064), new Big (0.056), new Big (0.048), new Big (0.04),                  new Big (0.032), new Big (0.024), new Big (0.016), new Big (0.008),                  new Big (0.0)];

        /**  Tabelle fuer die Hoechstbetrage des Versorgungsfreibetrags  */
        private readonly TAB2 : Big[] = [new Big (0), new Big (3000), new Big (2880),            new Big (2760), new Big (2640), new Big (2520), new Big (2400),             new Big (2280), new Big (2160), new Big (2040), new Big (1920),             new Big (1800), new Big (1680), new Big (1560), new Big (1440),             new Big (1320), new Big (1200), new Big (1140), new Big (1080),             new Big (1020), new Big (960), new Big (900), new Big (840),             new Big (780),  new Big (720), new Big (660), new Big (600),             new Big (540),  new Big (480), new Big (420), new Big (360),             new Big (300),  new Big (240), new Big (180), new Big (120),             new Big (60),   new Big (0)];

        /**  Tabelle fuer die Zuschlaege zum Versorgungsfreibetrag  */
        private readonly TAB3 : Big[] = [new Big (0), new Big (900), new Big (864),           new Big (828), new Big (792), new Big (756), new Big (720),           new Big (684), new Big (648), new Big (612), new Big (576),           new Big (540), new Big (504), new Big (468), new Big (432),           new Big (396), new Big (360), new Big (342), new Big (324),           new Big (306), new Big (288), new Big (270), new Big (252),           new Big (234), new Big (216), new Big (198), new Big (180),           new Big (162), new Big (144), new Big (126), new Big (108),           new Big (90),  new Big (72), new Big (54), new Big (36),           new Big (18),  new Big (0)];

        /**  Tabelle fuer die Vomhundertsaetze des Altersentlastungsbetrags  */
        private readonly TAB4 : Big[] = [new Big (0.0), new Big (0.4), new Big (0.384),           new Big (0.368), new Big (0.352), new Big (0.336), new Big (0.32),            new Big (0.304), new Big (0.288), new Big (0.272), new Big (0.256),            new Big (0.24),  new Big (0.224), new Big (0.208), new Big (0.192),            new Big (0.176), new Big (0.16), new Big (0.152),  new Big (0.144),            new Big (0.136), new Big (0.128), new Big (0.12),  new Big (0.112),            new Big (0.104), new Big (0.096), new Big (0.088), new Big (0.08),            new Big (0.072), new Big (0.064), new Big (0.056), new Big (0.048),            new Big (0.04),  new Big (0.032), new Big (0.024), new Big (0.016),            new Big (0.008), new Big (0.0)];

        /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
        private readonly TAB5 : Big[] = [new Big (0), new Big (1900), new Big (1824),           new Big (1748), new Big (1672), new Big (1596), new Big (1520),           new Big (1444), new Big (1368), new Big (1292), new Big (1216),           new Big (1140), new Big (1064), new Big (988),  new Big (912),           new Big (836),  new Big (760), new Big (722), new Big (684),           new Big (646),  new Big (608), new Big (570), new Big (532),           new Big (494),  new Big (456), new Big (418), new Big (380),           new Big (342),  new Big (304), new Big (266), new Big (228),           new Big (190),  new Big (152), new Big (114), new Big (76),           new Big (38),   new Big (0)];
 
        /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
        private readonly ZAHL1 : Big = this.Z_1;
        private readonly ZAHL2 : Big = new Big(2);
        private readonly ZAHL5 : Big = new Big(5);
        private readonly ZAHL7 : Big = new Big(7);
        private readonly ZAHL12 : Big = new Big(12);
        private readonly ZAHL100 : Big = new Big(100);
        private readonly ZAHL360 : Big = new Big(360);
        private readonly ZAHL500 : Big = new Big(500);
        private readonly ZAHL700 : Big = new Big(700);
        private readonly ZAHL1000 : Big = new Big(1000);
        private readonly ZAHL10000 : Big = new Big(10000);

    



  /**  PROGRAMMABLAUFPLAN, PAP Seite 13  */
  public calculate() : void {
  	this.MPARA(); 
    this.MRE4JL();
    this.VBEZBSO= this.Z_0;
    this.KENNVMT= 0;
    
    
    this.MRE4();
    this.MRE4ABZ();
    this.MBERECH();

    
    this.MSONST();
    this.MVMT();
  }

  /**  Zuweisung von Werten für bestimmte Sozialversicherungsparameter  PAP Seite 14  */
  private MPARA() : void {
  	 if (this.KRV < 2) {/**  &lt; = <  */
      	
	        if (this.KRV == 0) {
	      		
	      			this.BBGRV = new Big(82800);  /**  Neu 2020  */
	      		
	      		}else {
	        		this.BBGRV = new Big(77400);  /**  Neu 2020  */
	      		
      		}
      		this.RVSATZAN = new Big(0.093); /**  Neu 2019  */
      		this.TBSVORV = new Big(0.8);  /**  Neu 2020  */
      	
      	}else {
        	/**  Nichts zu tun  */
     	
     }
       
       	this.BBGKVPV = new Big(56250); /**  Neu 2020  */
       	this.bd = new Big(2);/**  Neu 2019  */
      	this.KVSATZAN = (this.KVZ.div(this.bd).div(this.ZAHL100)).add(new Big(0.07));/**  Neu 2019  */
      	this.KVSATZAG = new Big(0.0055+0.07);/**  Neu 2020  */
      	
      	if (this.PVS == 1) {
      		
      			this.PVSATZAN = new Big(0.02025); /**  Neu 2019  */
      			this.PVSATZAG = new Big(0.01025); /**  Neu 2019  */
      		
      		}else {
        		this.PVSATZAN =  new Big(0.01525); /**  Neu 2019  */
        		this.PVSATZAG =  new Big(0.01525); /**  Neu 2019  */
      		
      	}
      	if (this.PVZ == 1) {
      		
      			this.PVSATZAN = this.PVSATZAN.add(new Big(0.0025));
      		
      	}
      	
      	 /**  Anfang Neu 2020  */ 
      	 this.W1STKL5 = new Big(10898);
      	 this.W2STKL5 = new Big(28526);
      	 this.W3STKL5 = new Big(216400);
      	 this.GFB = new Big(9408);
      	  /**  Ende Neu 2020  */
      	 this.SOLZFREI = new Big(972);
     
  }

  /**  Ermittlung des Jahresarbeitslohns nach § 39 b Abs. 2 Satz 2 EStG, PAP Seite 15  */
  private MRE4JL() : void {
    if (this.LZZ == 1) {
      
        this.ZRE4J= this.RE4.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
        this.ZVBEZJ= this.VBEZ.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
        this.JLFREIB= this.LZZFREIB.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
        this.JLHINZU= this.LZZHINZU.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
      
      }else {
        if (this.LZZ == 2) {
          
            this.ZRE4J= (this.RE4.mul (this.ZAHL12)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
            this.ZVBEZJ= (this.VBEZ.mul (this.ZAHL12)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
            this.JLFREIB= (this.LZZFREIB.mul (this.ZAHL12)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
            this.JLHINZU= (this.LZZHINZU.mul (this.ZAHL12)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
          
          }else {
            if (this.LZZ == 3) {
              
                this.ZRE4J= (this.RE4.mul (this.ZAHL360)).div(this.ZAHL700).round( 2, RoundingMode.RoundDown);
                this.ZVBEZJ= (this.VBEZ.mul (this.ZAHL360)).div(this.ZAHL700).round( 2, RoundingMode.RoundDown);
                this.JLFREIB= (this.LZZFREIB.mul (this.ZAHL360)).div(this.ZAHL700).round( 2, RoundingMode.RoundDown);
                this.JLHINZU= (this.LZZHINZU.mul (this.ZAHL360)).div(this.ZAHL700).round( 2, RoundingMode.RoundDown);
              
              }else {
                this.ZRE4J= (this.RE4.mul (this.ZAHL360)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
                this.ZVBEZJ= (this.VBEZ.mul (this.ZAHL360)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
                this.JLFREIB= (this.LZZFREIB.mul (this.ZAHL360)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
                this.JLHINZU= (this.LZZHINZU.mul (this.ZAHL360)).div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
              
            }
          
        }
      
    }
    if (this.af == 0) {
		
			this.f= 1;
		
    }
  }

  /**  Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 16  */
  private MRE4() : void {
    if (this.ZVBEZJ.cmp (this.Z_0) == 0) {
      
        this.FVBZ= this.Z_0;
        this.FVB= this.Z_0;
        this.FVBZSO= this.Z_0;
        this.FVBSO= this.Z_0;
      
      }else {
        if (this.VJAHR < 2006) {
          
            this.J= 1;
          
          }else {
            if (this.VJAHR < 2040) {
              
                this.J= this.VJAHR - 2004;
              
              }else {
                this.J= 36;
              
            }
          
        }
        if (this.LZZ == 1) {
          
            this.VBEZB= (this.VBEZM.mul (new Big (this.ZMVB))).add (this.VBEZS);
            this.HFVB= this.TAB2[this.J].div (this.ZAHL12).mul (new Big (this.ZMVB));
            this.FVBZ= this.TAB3[this.J].div (this.ZAHL12).mul (new Big (this.ZMVB)).round (0, RoundingMode.RoundUp);
           
          }else {
            this.VBEZB= ((this.VBEZM.mul (this.ZAHL12)).add (this.VBEZS)).round (2, RoundingMode.RoundDown);
            this.HFVB= this.TAB2[this.J];
            this.FVBZ= this.TAB3[this.J];
          
        }
        this.FVB= ((this.VBEZB.mul (this.TAB1[this.J]))).div (this.ZAHL100).round (2, RoundingMode.RoundUp);
        if (this.FVB.cmp (this.HFVB) == 1) {
          
            this.FVB = this.HFVB;
          
        }
        
        if (this.FVB.cmp (this.ZVBEZJ) == 1) {
          
            this.FVB = this.ZVBEZJ;
          
        }
        
        this.FVBSO= (this.FVB.add((this.VBEZBSO.mul (this.TAB1[this.J])).div (this.ZAHL100))).round (2, RoundingMode.RoundUp);
        if (this.FVBSO.cmp (this.TAB2[this.J]) == 1) {
          
            this.FVBSO = this.TAB2[this.J];
           
        }
        this.HFVBZSO= (((this.VBEZB.add(this.VBEZBSO)).div (this.ZAHL100)).sub (this.FVBSO)).round (2, RoundingMode.RoundDown);        
        this.FVBZSO= (this.FVBZ.add((this.VBEZBSO).div (this.ZAHL100))).round (0, RoundingMode.RoundUp);
        if (this.FVBZSO.cmp (this.HFVBZSO) == 1) {
          
            this.FVBZSO = this.HFVBZSO.round(0, RoundingMode.RoundUp);
          
        }
        if (this.FVBZSO.cmp (this.TAB3[this.J]) == 1) {
          
            this.FVBZSO = this.TAB3[this.J];
          
        } 
        this.HFVBZ= ((this.VBEZB.div (this.ZAHL100)).sub (this.FVB)).round (2, RoundingMode.RoundDown);
        if (this.FVBZ.cmp (this.HFVBZ) == 1) {
          
            this.FVBZ = this.HFVBZ.round (0, RoundingMode.RoundUp);
          
        }
      
    }
    this.MRE4ALTE();
  }

  /**  Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 17  */
  private MRE4ALTE() : void {
    if (this.ALTER1 == 0) {
      
        this.ALTE= this.Z_0;
      
      }else {
        if (this.AJAHR < 2006) {
          
            this.K= 1;
          
          }else {
            if (this.AJAHR < 2040) {
              
                this.K= this.AJAHR - 2004;
              
              }else {
                this.K= 36;
              
            }
          
        }
        this.BMG= this.ZRE4J.sub (this.ZVBEZJ);
        /**  Lt. PAP muss hier auf ganze EUR gerundet werden  */
        this.ALTE = (this.BMG.mul(this.TAB4[this.K])).round(0, RoundingMode.RoundUp);
        this.HBALTE= this.TAB5[this.K];
        if (this.ALTE.cmp (this.HBALTE) == 1) {
          
            this.ALTE= this.HBALTE;
          
        }
      
    }
  }

  /**  Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 19  */
  private MRE4ABZ() : void { 
  	this.ZRE4= (this.ZRE4J.sub (this.FVB).sub   (this.ALTE).sub (this.JLFREIB).add (this.JLHINZU)).round (2, RoundingMode.RoundDown);
  	if (this.ZRE4.cmp (this.Z_0) == -1) { 
  		 
  			this.ZRE4= this.Z_0; 
  		 
  	} 
  	this.ZRE4VP= this.ZRE4J;

  	if (this.KENNVMT == 2) { 
  		 
  				this.ZRE4VP = this.ZRE4VP.sub(this.ENTSCH.div(this.ZAHL100)).round(2,RoundingMode.RoundDown); 
  		 
  	}

    this.ZVBEZ = this.ZVBEZJ.sub(this.FVB).round(2, RoundingMode.RoundDown);

    if (this.ZVBEZ.cmp(this.Z_0) == -1) { 
    	 
    		this.ZVBEZ = this.Z_0; 
    	 
    } 
  }

  /**  Berechnung fuer laufende Lohnzahlungszeitraueme Seite 20 */
  private MBERECH() : void { 

    this.MZTABFB(); 
    this.VFRB = ((this.ANP.add(this.FVB.add(this.FVBZ))).mul(this.ZAHL100)).round(0, RoundingMode.RoundDown);
    this.MLSTJAHR();
    
    this.WVFRB = ((this.ZVE.sub(this.GFB)).mul(this.ZAHL100)).round(0, RoundingMode.RoundDown); 
    if (this.WVFRB.cmp(this.Z_0) == -1) {  /**  WVFRB < 0  */
    	 
    		this.WVFRB = new Big(0); 
    	 
    } 
    
    
	this.LSTJAHR = (this.ST.mul(new Big(this.f))).round(0,RoundingMode.RoundDown); 
	this.UPLSTLZZ();
	this.UPVKVLZZ();
	   	
	 if (this.ZKF.cmp(this.Z_0) == 1) {  /**  ZKF > 0  */
	     
	    	  this.ZTABFB = this.ZTABFB.add(this.KFB); 
	    	  this.MRE4ABZ();
	    	  this.MLSTJAHR();
	    	  this.JBMG = (this.ST.mul(new Big(this.f))).round(0,RoundingMode.RoundDown); 
	     
	    }else {
	          this.JBMG = this.LSTJAHR; 
	    
	  } 
	  
	  this.MSOLZ();
	    
  }

/**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 21  */
  private MZTABFB() : void { 
    this.ANP= this.Z_0;
    if (this.ZVBEZ.cmp (this.Z_0) >= 0 && this.ZVBEZ.cmp(this.FVBZ) == -1) {
      
        this.FVBZ = new Big(this.ZVBEZ.toNumber());
      
    }
    if (this.STKL < 6) {
      
        if (this.ZVBEZ.cmp (this.Z_0) == 1) {
          
            if ((this.ZVBEZ.sub (this.FVBZ)).cmp (new Big (102)) == -1) {
              
                this.ANP= (this.ZVBEZ.sub (this.FVBZ)).round (0, RoundingMode.RoundUp);
              
              }else {
                this.ANP= new Big (102);
              
            }
          
        }
      
      }else {
      	this.FVBZ= new Big (0);
      	this.FVBZSO= new Big (0);
      
    }
    if (this.STKL < 6) {
      
      	if (this.ZRE4.cmp(this.ZVBEZ) == 1) {
        	
	        	if (this.ZRE4.sub(this.ZVBEZ).cmp(this.ZAHL1000) == -1) {
		        	
		        		this.ANP = this.ANP.add(this.ZRE4).sub(this.ZVBEZ).round(0,RoundingMode.RoundUp);
		        	
	        		}else {
	        			this.ANP = this.ANP.add(this.ZAHL1000);
	        		
	        	}
        	
        }
      
    }
    this.KZTAB= 1;
    if (this.STKL == 1) {
      
        this.SAP= new Big (36);
        this.KFB= (this.ZKF.mul (new Big (7812))).round (0, RoundingMode.RoundDown); /**  Neu 2020  */
      
	  }else {
			if (this.STKL == 2) {
			    
			        this.EFA= new Big (1908);
			        this.SAP= new Big (36);
			        this.KFB= (this.ZKF.mul (new Big (7812))).round (0, RoundingMode.RoundDown); /**  Neu 2020  */
			    
		 
		    	}else {
					if (this.STKL == 3) {
					    
					        this.KZTAB= 2;
					        this.SAP= new Big (36);
					        this.KFB= (this.ZKF.mul (new Big (7812))).round (0, RoundingMode.RoundDown); /**  Neu 2020  */
					    
					
						}else {
						  	if (this.STKL == 4) {
						      
						        this.SAP= new Big (36);
						        this.KFB= (this.ZKF.mul (new Big (3906))).round (0, RoundingMode.RoundDown); /**  Neu 2020  */
						       
								
							  }else {
								  	if (this.STKL == 5) {
								      
								        this.SAP= new Big (36);
								        this.KFB= this.Z_0;
								       
										
									  }else {
								        this.KFB= this.Z_0;
									  
									}
							 
							}
							
					}  	
					
			}	
			
    }
    this.ZTABFB= (this.EFA.add (this.ANP).add (this.SAP).add (this.FVBZ)).round (2, RoundingMode.RoundDown);
  }

  /**  Ermittlung Jahreslohnsteuer, PAP Seite 22  */
  private MLSTJAHR() : void {
     this.UPEVP();
    if (this.KENNVMT != 1) {
      
        this.ZVE= (this.ZRE4.sub (this.ZTABFB).sub (this.VSP)).round (2, RoundingMode.RoundDown);
        this.UPMLST();
      
      }else {
        this.ZVE= (this.ZRE4.sub (this.ZTABFB).sub (this.VSP).sub ((this.VMT).div (this.ZAHL100)).sub ((this.VKAPA).div (this.ZAHL100))).round (2, RoundingMode.RoundDown);
        if (this.ZVE.cmp (this.Z_0) == -1) {
          
             this.ZVE = this.ZVE.add(this.VMT.div(this.ZAHL100)).add(this.VKAPA.div(this.ZAHL100)).div(this.ZAHL5).round(2,RoundingMode.RoundDown);
            this.UPMLST();
            this.ST= (this.ST.mul (this.ZAHL5)).round (0, RoundingMode.RoundDown); 
          
          }else {
            this.UPMLST();
	        this.STOVMT= this.ST;
            this.ZVE= (this.ZVE.add(((this.VMT.add (this.VKAPA)).div (this.ZAHL500)))).round (2, RoundingMode.RoundDown);
            this.UPMLST();
            this.ST= (((this.ST.sub (this.STOVMT)).mul (this.ZAHL5)).add (this.STOVMT)).round (0, RoundingMode.RoundDown); 
          
        }
      
    } 
  }
  
  /**  PAP Seite 23  */ 
  private UPVKVLZZ() : void {
	 this.UPVKV();
	 this.JW = this.VKV;
	 this.UPANTEIL();
	 this.VKVLZZ = this.ANTEIL1;
  }

  /**  PAP Seite 23  */ 
  private UPVKV() : void {
	 if (this.PKV > 0) {
		
			if (this.VSP2.cmp(this.VSP3) == 1) {
				
					this.VKV = this.VSP2.mul(this.ZAHL100);
				
				}else {
					this.VKV = this.VSP3.mul(this.ZAHL100);
				
			}
		
		}else {
			this.VKV = this.Z_0;
		
	}
  }
  
  /**  PAP Seite 24  */
   private UPLSTLZZ() : void {
   	  this.JW = this.LSTJAHR.mul(this.ZAHL100);  
	  this.UPANTEIL();
	  this.LSTLZZ = this.ANTEIL1;
   }
	
  /**  Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif. PAP Seite 25  */
  private UPMLST() : void {
	if (this.ZVE.cmp (this.ZAHL1) == -1) {
      
        this.ZVE= this.Z_0;
        this.X= this.Z_0;
      
      }else {
        this.X= (this.ZVE.div (new Big(this.KZTAB))).round (0, RoundingMode.RoundDown);
      
    }
	if (this.STKL < 5) {
      
      
      	 /**  Neu 2020  */
      	 this.UPTAB20(); 

      
      }else {
        this.MST5_6();
      
    }
  }	  

  /**  	Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG)
  			Achtung: Es wird davon ausgegangen, dass	
  				a) Es wird davon ausge-gangen, dassa) für die BBG (Ost) 60.000 Euro und für die BBG (West) 71.400 Euro festgelegt wird sowie
  				b) der Beitragssatz zur Rentenversicherung auf 18,9 % gesenkt wird.
  			
  			PAP Seite 26   */
  private UPEVP() : void {
    if (this.KRV > 1) {/**  &lt; = < &gt; = >  */
      
        this.VSP1= this.Z_0;
      
		}else {  
		    if (this.ZRE4VP.cmp(this.BBGRV) == 1) {
      			
      				this.ZRE4VP = this.BBGRV;
      			
      		}
      		this.VSP1 = (this.TBSVORV.mul(this.ZRE4VP)).round(2,RoundingMode.RoundDown);
      		this.VSP1 = (this.VSP1.mul(this.RVSATZAN)).round(2,RoundingMode.RoundDown);
	    
    }
    this.VSP2 = (this.ZRE4VP.mul(new Big(0.12))).round(2,RoundingMode.RoundDown);
    if (this.STKL == 3) {
	    
	        this.VHB = new Big(3000);
	    
	    }else {
	        this.VHB = new Big(1900);
	    
     }
    if (this.VSP2.cmp (this.VHB) == 1) {
      
        this.VSP2= this.VHB;
      
    }
    this.VSPN= (this.VSP1.add (this.VSP2)).round (0, RoundingMode.RoundUp);
    this.MVSP();
    if (this.VSPN.cmp (this.VSP) == 1) {
      
        this.VSP= this.VSPN.round (2, RoundingMode.RoundDown);
      
    }
  }
 
  /**  Vorsorgepauschale (§39b Abs. 2 Satz 5 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 27  */
  private MVSP() : void {
    if (this.ZRE4VP.cmp(this.BBGKVPV) == 1) {
      
	  	this.ZRE4VP = this.BBGKVPV;
	  
    }

    if (this.PKV > 0) {
      
			    if (this.STKL == 6) {
			      
						this.VSP3 = this.Z_0;
				  
				  }else {
				    	this.VSP3 = this.PKPV.mul(this.ZAHL12).div(this.ZAHL100);
						if (this.PKV == 2) {
						    
									this.VSP3 = this.VSP3.sub( this.ZRE4VP.mul( this.KVSATZAG.add(this.PVSATZAG))).round(2,RoundingMode.RoundDown);
								    		
						}
				  
			    }
	    
	    }else {
				this.VSP3 = this.ZRE4VP.mul(this.KVSATZAN.add(this.PVSATZAN)).round(2, RoundingMode.RoundDown);
	    
    }
		this.VSP = this.VSP3.add(this.VSP1).round(0, RoundingMode.RoundUp);
  }

  /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 28  */
  private MST5_6() : void {
    this.ZZX= this.X;
    if (this.ZZX.cmp(this.W2STKL5) == 1) {
      
        this.ZX= this.W2STKL5;
        this.UP5_6();
	    if (this.ZZX.cmp (this.W3STKL5) == 1) {
	      
            this.ST= (this.ST.add ((this.W3STKL5.sub (this.W2STKL5)).mul (new Big (0.42)))).round (0, RoundingMode.RoundDown);
            this.ST= (this.ST.add ((this.ZZX.sub (this.W3STKL5)).mul (new Big (0.45)))).round (0, RoundingMode.RoundDown);
          
          }else {
            this.ST= (this.ST.add ((this.ZZX.sub (this.W2STKL5)).mul (new Big (0.42)))).round (0, RoundingMode.RoundDown);
          
        }
      
      }else {
        this.ZX= this.ZZX;
        this.UP5_6();
        if (this.ZZX.cmp (this.W1STKL5) == 1) { 
          
            this.VERGL= this.ST;
            this.ZX= this.W1STKL5; 
            this.UP5_6();
            this.HOCH= (this.ST.add ((this.ZZX.sub (this.W1STKL5)).mul (new Big (0.42)))).round (0, RoundingMode.RoundDown); /**  Neuer Wert 2014  */
            if (this.HOCH.cmp (this.VERGL) == -1) {
              
                this.ST= this.HOCH;
              
              }else {
                this.ST= this.VERGL;
              
            }
          
        }
      
    }
  }

  /**  Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 29  */
  private UP5_6() : void {
    this.X= (this.ZX.mul (new Big (1.25))).round (2, RoundingMode.RoundDown);
    
   	 /**  Neu 2020  */
   	this.UPTAB20(); 
    
    this.ST1= this.ST;
    this.X= (this.ZX.mul (new Big (0.75))).round (2, RoundingMode.RoundDown);
    
   	 /**  Neu 2020  */
   	 this.UPTAB20(); 
    
    this.ST2= this.ST;
    this.DIFF= (this.ST1.sub (this.ST2)).mul (this.ZAHL2);
    this.MIST= (this.ZX.mul (new Big (0.14))).round (0, RoundingMode.RoundDown);
    if (this.MIST.cmp (this.DIFF) == 1) {
      
        this.ST= this.MIST;
      
      }else {
        this.ST= this.DIFF;
      
    }
  }

  /**  Solidaritaetszuschlag, PAP Seite 30  */
  private MSOLZ() : void {
    this.SOLZFREI = (this.SOLZFREI.mul(new Big(this.KZTAB))); 
    if (this.JBMG.cmp (this.SOLZFREI) == 1) {
      
        this.SOLZJ= (this.JBMG.mul (new Big (5.5))).div(this.ZAHL100).round(2, RoundingMode.RoundDown);
        this.SOLZMIN= (this.JBMG.sub (this.SOLZFREI)).mul (new Big (20)).div (this.ZAHL100).round (2, RoundingMode.RoundDown);
        if (this.SOLZMIN.cmp (this.SOLZJ) == -1) {
          
            this.SOLZJ= this.SOLZMIN;
          
        }
        this.JW= this.SOLZJ.mul (this.ZAHL100).round (0, RoundingMode.RoundDown);
                
        this.UPANTEIL();
        
        this.SOLZLZZ= this.ANTEIL1;
      
      }else {
        this.SOLZLZZ= this.Z_0;
      
    }
    if (this.R > 0) {
      
        this.JW= this.JBMG.mul (this.ZAHL100);        
        
        this.UPANTEIL();
        this.BK= this.ANTEIL1;
      
      }else {
        this.BK= this.Z_0;
      
    }
  }

  /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 9 EStG), PAP Seite 31  */
  private UPANTEIL() : void {
    if (this.LZZ == 1) {
      
        this.ANTEIL1= this.JW;
      
      }else {
        if (this.LZZ == 2) {
          
            this.ANTEIL1= this.JW.div(this.ZAHL12).round( 0, RoundingMode.RoundDown);
          
          }else {
            if (this.LZZ == 3) {
               
                this.ANTEIL1= (this.JW.mul (this.ZAHL7)).div(this.ZAHL360).round( 0, RoundingMode.RoundDown);
              
              }else {
                this.ANTEIL1= this.JW.div(this.ZAHL360).round( 0, RoundingMode.RoundDown);
              
            }
          
        }
      
    }
  }

  /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 8 EStG), PAP Seite 32  */
  private MSONST() : void {
    this.LZZ= 1;
    if (this.ZMVB == 0) {
      
        this.ZMVB= 12;
      
    }
    if (this.SONSTB.cmp (this.Z_0) == 0) {
      
        this.VKVSONST= this.Z_0;
        this.LSTSO= this.Z_0;
        this.STS= this.Z_0;
        this.SOLZS= this.Z_0;
        this.BKS= this.Z_0;
      
      }else {
        this.MOSONST();
        this.UPVKV();
        this.VKVSONST = this.VKV;
        this.ZRE4J= ((this.JRE4.add (this.SONSTB)).div (this.ZAHL100)).round (2, RoundingMode.RoundDown);
        this.ZVBEZJ= ((this.JVBEZ.add (this.VBS)).div (this.ZAHL100)).round (2, RoundingMode.RoundDown);
        this.VBEZBSO= this.STERBE;
        this.MRE4SONST();
        this.MLSTJAHR();
        
         this.WVFRBM = (this.ZVE.sub(this.GFB)).mul(this.ZAHL100).round(2,RoundingMode.RoundDown);
         if (this.WVFRBM.cmp(this.Z_0) == -1) { /**  WVFRBM < 0  */
          
            this.WVFRBM = this.Z_0;
          
        }
        
        this.UPVKV();
        this.VKVSONST = this.VKV.sub(this.VKVSONST);
        this.LSTSO= this.ST.mul (this.ZAHL100);
        /**  	lt. PAP muss hier auf ganze EUR aufgerundet werden, 
        			allerdings muss der Wert in Cent vorgehalten werden,
        			deshalb nach dem Aufrunden auf ganze EUR durch 'divide(ZAHL100, 0, BigDecimal.ROUND_DOWN)'
        			wieder die Multiplikation mit 100  */
        this.STS = this.LSTSO.sub(this.LSTOSO).mul(new Big(this.f)).div(this.ZAHL100).round( 0, RoundingMode.RoundDown).mul(this.ZAHL100);
        if (this.STS.cmp (this.Z_0) == -1) {
          
            this.STS= this.Z_0;
          
        }
        this.SOLZS= this.STS.mul (new Big (5.5)).div(this.ZAHL100).round( 0, RoundingMode.RoundDown);
        if (this.R > 0) {
          
            this.BKS= this.STS;
          
          }else {
            this.BKS= this.Z_0;
          
        }
      
    }
  }

  /**  Berechnung der Verguetung fuer mehrjaehrige Taetigkeit nach § 39b Abs. 3 Satz 9 und 10 EStG), PAP Seite 33  */
  private MVMT() : void {
    if (this.VKAPA.cmp (this.Z_0) == -1) {
      
        this.VKAPA= this.Z_0;
      
    }
    if ((this.VMT.add (this.VKAPA)).cmp (this.Z_0) == 1) {
      
        if (this.LSTSO.cmp (this.Z_0) == 0) {
          
            this.MOSONST();
            this.LST1= this.LSTOSO;
          
          }else {
            this.LST1= this.LSTSO;
          
        }
        this.VBEZBSO= this.STERBE.add (this.VKAPA);
        this.ZRE4J= ((this.JRE4.add (this.SONSTB).add (this.VMT).add (this.VKAPA)).div (this.ZAHL100)).round (2, RoundingMode.RoundDown);
        this.ZVBEZJ= ((this.JVBEZ.add (this.VBS).add (this.VKAPA)).div (this.ZAHL100)).round (2, RoundingMode.RoundDown);
        this.KENNVMT = 2;
        this.MRE4SONST();
        this.MLSTJAHR();
        this.LST3= this.ST.mul (this.ZAHL100);
        this.MRE4ABZ();
        this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
        this.KENNVMT= 1;
        this.MLSTJAHR();
        this.LST2= this.ST.mul (this.ZAHL100);
        this.STV= this.LST2.sub (this.LST1); 
        this.LST3= this.LST3.sub (this.LST1);
        if (this.LST3.cmp (this.STV) == -1) {
          
            this.STV= this.LST3;
          
        }
        if (this.STV.cmp (this.Z_0) == -1) {
          
            this.STV= this.Z_0;
          
        	}else {
	        	/** 	
	        		lt. PAP muss hier auf ganze EUR abgerundet werden.
   	        	Allerdings muss auch hier der Wert in Cent vorgehalten werden,
        			weshalb nach dem Aufrunden auf ganze EUR durch 'divide(ZAHL100, 0, BigDecimal.ROUND_DOWN)'
        			wieder die Multiplikation mit 100 erfolgt.
        		 */
	        	this.STV = this.STV.mul(new Big(this.f)).div(this.ZAHL100).round( 0, RoundingMode.RoundDown).mul(this.ZAHL100);
        	
        }
				this.SOLZV= ((this.STV.mul (new Big (5.5))).div (this.ZAHL100)).round (0, RoundingMode.RoundDown);
        if (this.R > 0) {
          
            this.BKV= this.STV;
          
          }else {
            this.BKV= this.Z_0;
          
        }
      
      }else { 
        this.STV= this.Z_0;
        this.SOLZV= this.Z_0;
        this.BKV= this.Z_0;
      
    }
  }

  /**  Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 34  */
  private MOSONST() : void {
    this.ZRE4J= (this.JRE4.div (this.ZAHL100)).round (2, RoundingMode.RoundDown);
    this.ZVBEZJ= (this.JVBEZ.div (this.ZAHL100)).round (2, RoundingMode.RoundDown);
    this.JLFREIB= this.JFREIB.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
    this.JLHINZU= this.JHINZU.div(this.ZAHL100).round( 2, RoundingMode.RoundDown);
    this.MRE4();
    this.MRE4ABZ();
    this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100));
    this.MZTABFB(); 
    this.VFRBS1 = ((this.ANP.add(this.FVB.add(this.FVBZ))).mul(this.ZAHL100)).round(2,RoundingMode.RoundDown);
    this.MLSTJAHR();
    
     this.WVFRBO = ((this.ZVE.sub(this.GFB)).mul(this.ZAHL100)).round(2, RoundingMode.RoundDown);
     if (this.WVFRBO.cmp(this.Z_0) == -1 ) {
	     
	            this.WVFRBO = this.Z_0;
	     
     }
    
    this.LSTOSO= this.ST.mul (this.ZAHL100);
  }

  /**  Sonderberechnung mit sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 35  */
  private MRE4SONST() : void {
    this.MRE4();
    this.FVB= this.FVBSO;
    this.MRE4ABZ();
    this.ZRE4VP = this.ZRE4VP.sub(this.JRE4ENT.div(this.ZAHL100)).sub(this.SONSTENT.div(this.ZAHL100));
    this.FVBZ= this.FVBZSO;
    this.MZTABFB(); 
    this.VFRBS2 = ((((this.ANP.add(this.FVB).add(this.FVBZ))).mul(this.ZAHL100))).sub(this.VFRBS1);
  }
  
  /**  Komplett Neu 2020  */
     /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 36  */
  private UPTAB20() : void {
    if (this.X.cmp(this.GFB.add(this.ZAHL1)) == -1) { 
      
        this.ST= this.Z_0;
      
      }else {
        if (this.X.cmp (new Big (14533)) == -1) {/**  neu seit 2020  */
          
            this.Y = (this.X.sub(this.GFB)).div(this.ZAHL10000).round( 6, RoundingMode.RoundDown); 
            this.RW= this.Y.mul (new Big (972.87)); /**  neu seit 2020  */
            this.RW= this.RW.add (new Big (1400));
            this.ST= (this.RW.mul (this.Y)).round (0, RoundingMode.RoundDown);
          
          }else {
            if (this.X.cmp (new Big (57052)) == -1) {/**  neu seit 2020  */
              
                this.Y= (this.X.sub (new Big (14532))).div(this.ZAHL10000).round( 6, RoundingMode.RoundDown);
                this.RW= this.Y.mul (new Big (212.02));/**  neu seit 2020  */
                this.RW= this.RW.add (new Big (2397));
                this.RW= this.RW.mul (this.Y);
                this.ST= (this.RW.add (new Big (972.79))).round (0, RoundingMode.RoundDown); /**  neu seit 2020  */
              
              }else {
	            if (this.X.cmp (new Big (270501)) == -1) {/**  neu seit 2020  */
	              
                    this.ST= ((this.X.mul (new Big (0.42))).sub (new Big (8963.74))).round (0, RoundingMode.RoundDown); /**  neu seit 2020  */
                  
                  }else {
                    this.ST= ((this.X.mul (new Big (0.45))).sub (new Big (17078.74))).round (0, RoundingMode.RoundDown); /**  neu seit 2020  */
                  
                }
              
            }
          
        }
      
    }
    this.ST= this.ST.mul (new Big (this.KZTAB));
  }
  

	/**
	 * Getter for af.
	 * <p>
	 *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV) 
	 * <p>
	 * @return the value
	 */
	public getAf() : number {
		return this.af;
    }
    
    /**
     * Setter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV) 
     * <p>
     * @param {number} af input value 
     */
	public setAf( af : number) : void {
		this.af = af;
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
	 * Getter for ENTSCH.
	 * <p>
	 *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent 
	 * <p>
	 * @return the value
	 */
	public getENTSCH() : Big {
		return this.ENTSCH;
    }
    
    /**
     * Setter for ENTSCH.
     * <p>
     *  in VKAPA und VMT enthaltene Entschädigungen nach §24 Nummer 1 EStG in Cent 
     * <p>
     * @param {Big} ENTSCH input value 
     */
	public setENTSCH( ENTSCH : Big) : void {
		this.ENTSCH = ENTSCH;
    }
    
	/**
	 * Getter for f.
	 * <p>
	 *  eingetragener Faktor mit drei Nachkommastellen 
	 * <p>
	 * @return the value
	 */
	public getF() : number {
		return this.f;
    }
    
    /**
     * Setter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen 
     * <p>
     * @param {number} f input value 
     */
	public setF( f : number) : void {
		this.f = f;
    }
    
	/**
	 * Getter for JFREIB.
	 * <p>
	 *  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
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
     *  Jahresfreibetrag nach Maßgabe der Eintragungen auf der
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
	 *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne Vergütung für mehrjährige Tätigkeit in Cent. 
	             Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingabe „sonsti-ger Bezüge“ (Feld SONSTB) 
	             oder bei Eingabe der „Vergütung für mehrjährige Tätigkeit“ (Feld VMT).
	             Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden, so sind sie dem 
	             voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrere Jahres aus einem vorangegangenen 
	             Abrechnungszeitraum sind in voller Höhe hinzuzurechnen. 
	 * <p>
	 * @return the value
	 */
	public getJRE4() : Big {
		return this.JRE4;
    }
    
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
	 * Merker für die Vorsorgepauschale
				2 = der Arbeitnehmer ist NICHT in der gesetzlichen Rentenversicherung versichert.
				
				1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die 
					Beitragsbemessungsgrenze OST.
					
				0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung versichert, es gilt die 
					Beitragsbemessungsgrenze WEST. 
	 * <p>
	 * @return the value
	 */
	public getKRV() : number {
		return this.KRV;
    }
    
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
	public setKRV( KRV : number) : void {
		this.KRV = KRV;
    }
    
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
	public getKVZ() : Big {
		return this.KVZ;
    }
    
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
	public setKVZ( KVZ : Big) : void {
		this.KVZ = KVZ;
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
	 * Getter for LZZFREIB.
	 * <p>
	 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
	             den Lohnzahlungszeitraum in Cent 
	 * <p>
	 * @return the value
	 */
	public getLZZFREIB() : Big {
		return this.LZZFREIB;
    }
    
    /**
     * Setter for LZZFREIB.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Freibetrag für
	             den Lohnzahlungszeitraum in Cent 
     * <p>
     * @param {Big} LZZFREIB input value 
     */
	public setLZZFREIB( LZZFREIB : Big) : void {
		this.LZZFREIB = LZZFREIB;
    }
    
	/**
	 * Getter for LZZHINZU.
	 * <p>
	 *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
	             für den Lohnzahlungszeitraum in Cent 
	 * <p>
	 * @return the value
	 */
	public getLZZHINZU() : Big {
		return this.LZZHINZU;
    }
    
    /**
     * Setter for LZZHINZU.
     * <p>
     *  In der Lohnsteuerkarte des Arbeitnehmers eingetragener Hinzurechnungsbetrag
	             für den Lohnzahlungszeitraum in Cent 
     * <p>
     * @param {Big} LZZHINZU input value 
     */
	public setLZZHINZU( LZZHINZU : Big) : void {
		this.LZZHINZU = LZZHINZU;
    }
    
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
	public getPKPV() : Big {
		return this.PKPV;
    }
    
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
	public setPKPV( PKPV : Big) : void {
		this.PKPV = PKPV;
    }
    
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
	public getPKV() : number {
		return this.PKV;
    }
    
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
	public setPKV( PKV : number) : void {
		this.PKV = PKV;
    }
    
	/**
	 * Getter for PVS.
	 * <p>
	 *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw. 
	        	 	zu berücksichtigen wären, sonst 0. 
	 * <p>
	 * @return the value
	 */
	public getPVS() : number {
		return this.PVS;
    }
    
    /**
     * Setter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw. 
	        	 	zu berücksichtigen wären, sonst 0. 
     * <p>
     * @param {number} PVS input value 
     */
	public setPVS( PVS : number) : void {
		this.PVS = PVS;
    }
    
	/**
	 * Getter for PVZ.
	 * <p>
	 *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung 
	        	 	zu zahlen hat, sonst 0. 
	 * <p>
	 * @return the value
	 */
	public getPVZ() : number {
		return this.PVZ;
    }
    
    /**
     * Setter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung 
	        	 	zu zahlen hat, sonst 0. 
     * <p>
     * @param {number} PVZ input value 
     */
	public setPVZ( PVZ : number) : void {
		this.PVZ = PVZ;
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
	 *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen 
	             für mehrere Jahre in Cent (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getVKAPA() : Big {
		return this.VKAPA;
    }
    
    /**
     * Setter for VKAPA.
     * <p>
     *  Kapitalauszahlungen / Abfindungen / Nachzahlungen bei Versorgungsbezügen 
	             für mehrere Jahre in Cent (ggf. 0) 
     * <p>
     * @param {Big} VKAPA input value 
     */
	public setVKAPA( VKAPA : Big) : void {
		this.VKAPA = VKAPA;
    }
    
	/**
	 * Getter for VMT.
	 * <p>
	 *  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen 
				 bei Versorgungsbezügen in Cent (ggf. 0) 
	 * <p>
	 * @return the value
	 */
	public getVMT() : Big {
		return this.VMT;
    }
    
    /**
     * Setter for VMT.
     * <p>
     *  Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne Abfindungen 
				 bei Versorgungsbezügen in Cent (ggf. 0) 
     * <p>
     * @param {Big} VMT input value 
     */
	public setVMT( VMT : Big) : void {
		this.VMT = VMT;
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
	 * Getter for JRE4ENT.
	 * <p>
	 *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent 
	 * <p>
	 * @return the value
	 */
	public getJRE4ENT() : Big {
		return this.JRE4ENT;
    }
    
    /**
     * Setter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent 
     * <p>
     * @param {Big} JRE4ENT input value 
     */
	public setJRE4ENT( JRE4ENT : Big) : void {
		this.JRE4ENT = JRE4ENT;
    }
    
	/**
	 * Getter for SONSTENT.
	 * <p>
	 *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent 
	 * <p>
	 * @return the value
	 */
	public getSONSTENT() : Big {
		return this.SONSTENT;
    }
    
    /**
     * Setter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent 
     * <p>
     * @param {Big} SONSTENT input value 
     */
	public setSONSTENT( SONSTENT : Big) : void {
		this.SONSTENT = SONSTENT;
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
	public getVKVLZZ() : Big {
		return this.VKVLZZ;
    }
    
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
	public getVKVSONST() : Big {
		return this.VKVSONST;
    }
    
	/**
	 * Getter for VFRB.
	 * <p>
	 *  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent 
	 * <p>
	 * @return the value
	 */
	public getVFRB() : Big {
		return this.VFRB;
    }
    
	/**
	 * Getter for VFRBS1.
	 * <p>
	 *  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent 
	 * <p>
	 * @return the value
	 */
	public getVFRBS1() : Big {
		return this.VFRBS1;
    }
    
	/**
	 * Getter for VFRBS2.
	 * <p>
	 *  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent 
	 * <p>
	 * @return the value
	 */
	public getVFRBS2() : Big {
		return this.VFRBS2;
    }
    
	/**
	 * Getter for WVFRB.
	 * <p>
	 *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über 
				dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent 
	 * <p>
	 * @return the value
	 */
	public getWVFRB() : Big {
		return this.WVFRB;
    }
    
	/**
	 * Getter for WVFRBO.
	 * <p>
	 *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag 
				bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent 
	 * <p>
	 * @return the value
	 */
	public getWVFRBO() : Big {
		return this.WVFRBO;
    }
    
	/**
	 * Getter for WVFRBM.
	 * <p>
	 *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE 
				über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent 
	 * <p>
	 * @return the value
	 */
	public getWVFRBM() : Big {
		return this.WVFRBM;
    }
    
	/**
	 * Initialize all inputs values with zero.
	 */
	public initInputs() : void {
		
		this.af = 0;
		
		this.AJAHR = 0;
		
		this.ALTER1 = 0;
		
		this.ENTSCH = this.Z_0;
		
		this.f = 0;
		
		this.JFREIB = this.Z_0;
		
		this.JHINZU = this.Z_0;
		
		this.JRE4 = this.Z_0;
		
		this.JVBEZ = this.Z_0;
		
		this.KRV = 0;
		
		this.KVZ = this.Z_0;
		
		this.LZZ = 0;
		
		this.LZZFREIB = this.Z_0;
		
		this.LZZHINZU = this.Z_0;
		
		this.PKPV = this.Z_0;
		
		this.PKV = 0;
		
		this.PVS = 0;
		
		this.PVZ = 0;
		
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
		
		this.ZKF = this.Z_0;
		
		this.ZMVB = 0;
		
		this.JRE4ENT = this.Z_0;
		
		this.SONSTENT = this.Z_0;
		
	}
	
	/**
	 * Setter for all input parameters with type Big.
	 * 
	 * @param {String} name Variable name to set.
	 * @param {Big} value Value to set.
	 */
	public setBig(name: String, value : Big) : void {
		switch(name) {
		case 'ENTSCH': this.ENTSCH = value; break;
			case 'JFREIB': this.JFREIB = value; break;
			case 'JHINZU': this.JHINZU = value; break;
			case 'JRE4': this.JRE4 = value; break;
			case 'JVBEZ': this.JVBEZ = value; break;
			case 'KVZ': this.KVZ = value; break;
			case 'LZZFREIB': this.LZZFREIB = value; break;
			case 'LZZHINZU': this.LZZHINZU = value; break;
			case 'PKPV': this.PKPV = value; break;
			case 'RE4': this.RE4 = value; break;
			case 'SONSTB': this.SONSTB = value; break;
			case 'STERBE': this.STERBE = value; break;
			case 'VBEZ': this.VBEZ = value; break;
			case 'VBEZM': this.VBEZM = value; break;
			case 'VBEZS': this.VBEZS = value; break;
			case 'VBS': this.VBS = value; break;
			case 'VKAPA': this.VKAPA = value; break;
			case 'VMT': this.VMT = value; break;
			case 'ZKF': this.ZKF = value; break;
			case 'JRE4ENT': this.JRE4ENT = value; break;
			case 'SONSTENT': this.SONSTENT = value; break;
			
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
		case 'af': this.af = value; break;
			case 'AJAHR': this.AJAHR = value; break;
			case 'ALTER1': this.ALTER1 = value; break;
			case 'f': this.f = value; break;
			case 'KRV': this.KRV = value; break;
			case 'LZZ': this.LZZ = value; break;
			case 'PKV': this.PKV = value; break;
			case 'PVS': this.PVS = value; break;
			case 'PVZ': this.PVZ = value; break;
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
			case 'VKVLZZ': return this.VKVLZZ;
			case 'VKVSONST': return this.VKVSONST;
			case 'VFRB': return this.VFRB;
			case 'VFRBS1': return this.VFRBS1;
			case 'VFRBS2': return this.VFRBS2;
			case 'WVFRB': return this.WVFRB;
			case 'WVFRBO': return this.WVFRBO;
			case 'WVFRBM': return this.WVFRBM;
			
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
			"af","AJAHR","ALTER1","ENTSCH","f","JFREIB","JHINZU","JRE4","JVBEZ","KRV","KVZ","LZZ","LZZFREIB","LZZHINZU","PKPV","PKV","PVS","PVZ","R","RE4","SONSTB","STERBE","STKL","VBEZ","VBEZM","VBEZS","VBS","VJAHR","VKAPA","VMT","ZKF","ZMVB","JRE4ENT","SONSTENT",
		];
	}

	/**
	 * Get all output names.
	 */
	public getOutputs() : String[] {
		return [
			"BK","BKS","BKV","LSTLZZ","SOLZLZZ","SOLZS","SOLZV","STS","STV","VKVLZZ","VKVSONST","VFRB","VFRBS1","VFRBS2","WVFRB","WVFRBO","WVFRBM",
		];
	}
	
}
    