import os
from django.shortcuts import render
from requests import request
# from sqlalchemy import null
from . import countryvolume, regionvolume,globalvolume
from reportgen import countryvalue
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .serialzers import reportserializer,regionserializer,allreposerializer,report_edit
from rest_framework.response import Response
from .models import reports,region1
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,AllowAny 
from . import countryvalue,regionvalue,globalvalue,countryvaluewithvol,regionvaluewithvol,globalvaluewithvol
from rest_framework.permissions import IsAdminUser
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import  permission_classes
from rest_framework.views import APIView
import copy
from zipfile import ZipFile
import random
from django.core.files import File
from rest_framework.decorators import action




# class report(viewsets.ModelViewSet):
#     queryset = reports.objects.all().order_by('createddate').reverse()
#     serializer_class = reportserializer
#     permission_classes = [IsAuthenticated ]
#     def create(self, request, *args, **kwargs):
#         data=request.data
#         data["creator"]=request.user.username
#         data["tocprocessed"]=copy.deepcopy(data["toc"])
#         if request.data["geography"]=="Country" and request.data["value"]==True and request.data["volume"]==False :
#             repo=countryvalue.reportmake(data["tocprocessed"],data["year"],data["reportname"],data["market"],data["valueunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]
#             data["regiondet"]={}
#             data["region"]={}
#         elif request.data["geography"]=="Country" and request.data["value"]==False and request.data["volume"]==True :
#             repo=countryvolume.reportmake(data["tocprocessed"],data["ASP"],data["reportname"],data["market"],data["volumeunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]
#             data["regiondet"]={}
#             data["region"]={}
#         elif request.data["geography"]=="Country" and request.data["value"]==True and request.data["volume"]==True :
#             repo=countryvaluewithvol.reportmake(data["tocprocessed"],data["year"],data["ASP"],data["reportname"],data["market"],data["valueunit"],data["volumeunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]
#             data["regiondet"]={}
#             data["region"]={}


#         elif request.data["geography"]=="Regional" and request.data["value"]==True and request.data["volume"]==False:
#             repo,data["regiondet"],data["region"]=regionvalue.reportmake(data["tocprocessed"],data["year"],data["market"],data["reportname"],data["valueunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]

#         elif request.data["geography"]=="Regional" and request.data["value"]==False and request.data["volume"]==True:
#             repo,data["regiondet"],data["region"]=regionvolume.reportmake(data["tocprocessed"],data["ASP"],data["market"],data["reportname"],data["volumeunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]

#         elif request.data["geography"]=="Regional" and request.data["value"]==True and request.data["volume"]==True:
#             repo,data["regiondet"],data["region"] =regionvaluewithvol.reportmake(data["tocprocessed"],data["year"],data['ASP'],data["market"],data["reportname"],data["valueunit"],data["volumeunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]
#         elif request.data["geography"]=="Global" and request.data["value"]==True and request.data["volume"]==False:
#             repo,data["regiondet"],data["region"]=globalvalue.final(data["tocprocessed"],data["year"],data["reportname"],data["valueunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]


#         elif request.data["geography"]=="Global" and request.data["value"]==False and request.data["volume"]==True:
#             repo,data["regiondet"],data["region"]=globalvolume.final(data["tocprocessed"],data["ASP"],data["reportname"],data["volumeunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]
        
#         # print(data["toc"])
#         # print(data["regiondet"])
#         elif request.data["geography"]=="Global" and request.data["value"]==True and request.data["volume"]==True:
#             repo,data["regiondet"],data["region"]=globalvaluewithvol.final(data["tocprocessed"],data["year"],data["ASP"],data["reportname"],data["valueunit"],data["volumeunit"],data["tablesplit"])
#             data["reportloc"]=repo[0]
#             data["excelreport"]=repo[1]
#         serializer = self.get_serializer(data=data)
#         serializer.is_valid(raise_exception=True)
        
#         self.perform_create(serializer)
        
#         headers = self.get_success_headers(serializer.data)
#         return Response(
#             status=status.HTTP_201_CREATED, headers=headers
#         )



class report(viewsets.ModelViewSet):
    queryset = reports.objects.all().order_by('createddate').reverse()
    
    serializer_class = reportserializer
    permission_classes = [IsAuthenticated ]
    def create(self, request, *args, **kwargs):
        data=request.data
        data1=data
        try:
            data["creator"]=request.user.username
            
            data["tocprocessed"]=copy.deepcopy(data["toc"])
            if request.data["geography"]=="Country" and request.data["value"]==True and request.data["volume"]==False :
                repo=countryvalue.reportmake(data["tocprocessed"],data["year"],data["reportname"],data["market"],data["valueunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]
                data["regiondet"]={}
                data["region"]={}
            elif request.data["geography"]=="Country" and request.data["value"]==False and request.data["volume"]==True :
                repo=countryvolume.reportmake(data["tocprocessed"],data["ASP"],data["reportname"],data["market"],data["volumeunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]
                data["regiondet"]={}
                data["region"]={}
            elif request.data["geography"]=="Country" and request.data["value"]==True and request.data["volume"]==True :
                repo=countryvaluewithvol.reportmake(data["tocprocessed"],data["year"],data["ASP"],data["reportname"],data["market"],data["valueunit"],data["volumeunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]
                data["regiondet"]={}
                data["region"]={}


            elif request.data["geography"]=="Regional" and request.data["value"]==True and request.data["volume"]==False:
                repo,data["regiondet"],data["region"]=regionvalue.reportmake(data["tocprocessed"],data["year"],data["market"],data["reportname"],data["valueunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]

            elif request.data["geography"]=="Regional" and request.data["value"]==False and request.data["volume"]==True:
                repo,data["regiondet"],data["region"]=regionvolume.reportmake(data["tocprocessed"],data["ASP"],data["market"],data["reportname"],data["volumeunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]

            elif request.data["geography"]=="Regional" and request.data["value"]==True and request.data["volume"]==True:
                repo,data["regiondet"],data["region"] =regionvaluewithvol.reportmake(data["tocprocessed"],data["year"],data['ASP'],data["market"],data["reportname"],data["valueunit"],data["volumeunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]
            elif request.data["geography"]=="Global" and request.data["value"]==True and request.data["volume"]==False:
                repo,data["regiondet"],data["region"]=globalvalue.final(data["tocprocessed"],data["year"],data["reportname"],data["valueunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]


            elif request.data["geography"]=="Global" and request.data["value"]==False and request.data["volume"]==True:
                repo,data["regiondet"],data["region"]=globalvolume.final(data["tocprocessed"],data["ASP"],data["reportname"],data["volumeunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]
            
            # print(data["toc"])
            # print(data["regiondet"])
            elif request.data["geography"]=="Global" and request.data["value"]==True and request.data["volume"]==True:
                repo,data["regiondet"],data["region"]=globalvaluewithvol.final(data["tocprocessed"],data["year"],data["ASP"],data["reportname"],data["valueunit"],data["volumeunit"],data["tablesplit"])
                data["reportloc"]=repo[0]
                data["excelreport"]=repo[1]
            data["reportFlag"]=True
            try:
                while (reports.objects.filter(reportname=request.data["reportname"]).exists()):
                    request.data["reportname"]=request.data["reportname"]+"(1)"
            except Exception as e:
                print(e)
                pass

            # print(data["tocprocessed"])
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)

        except Exception as e:
            dir= os.getcwd()
            logfile=dir+"\log.txt"
            file=open(logfile,"a")
            
            # data1={data}
            file.write(str(e))
            print(e)
            data1["reportFlag"]=False
            # print(data1)
            serializer = self.get_serializer(data=data1)
            serializer.is_valid(raise_exception=True)
            
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)

        return Response(
            status=status.HTTP_201_CREATED, headers=headers
        )








# class getallreports(viewsets.ReadOnlyModelViewSet):
#     queryset = reports.objects.all().order_by('reportid').reverse()
#     serializer_class = allreposerializer
#     permission_classes = [IsAuthenticated ] 

class getallreports(viewsets.ReadOnlyModelViewSet):
    serializer_class = reportserializer
    permission_classes = [IsAuthenticated]
    queryset = reports.objects.all().order_by('reportid').reverse()

    @action(detail=False, methods=['get'], url_path='by-creator/(?P<creator>.+)')
    def by_creator(self, request, creator=None):
        queryset = self.get_queryset().filter(creator=creator)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class regions(viewsets.ModelViewSet):
    queryset = region1.objects.all().order_by('id')
    serializer_class = regionserializer
    permission_classes = [AllowAny ]


@api_view([ 'GET'])
@permission_classes((AllowAny, ))
def countrylist(self,format=None):
    item = region1.objects.all()
    j=[]
    for i in item:
        j.extend(i.country)

    return Response(j)



# class countrys(viewsets.ModelViewSet):
#     queryset = country.objects.all()
#     serializer_class = countryserializer
#     permission_classes = [IsAuthenticated ]

@api_view([ 'POST'])
@permission_classes((AllowAny, ))
def download(request):
    file_name=request.data["file_name"]
    file_path = os.getcwd() +'/'+ file_name
    f = open(file_path, 'rb')
    pdfFile = File(f)
    response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
    response['Content-Disposition'] = 'attachment;'
    return response


class downedit(APIView):
    permission_classes = [AllowAny ]
    queryset = reports.objects.all()
    serializer_class = report_edit
   
    def post(self,request,format=None):
        item = reports.objects.get(pk=request.data["reportid"])
        # print(request.data)
        toc=item.tocprocessed
        valueunit=item.valueunit
        volumeunit=item.volumeunit
        reportname=item.reportname
        value=item.value
        volume=item.volume
        geography=item.geography
        startyear=item.base_year
        endyear=item.endyear
        regdet=item.region
        tablesplit=item.tablesplit
        market=item.market

        if geography=="Country":
            if volume==False and value== True:
                report=countryvalue.reportmakedownedityear(toc," ",reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                file_path_docx = os.getcwd() +'/'+ report[0]
                file_path_xls = os.getcwd() +'/'+ report[1]
                file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                with ZipFile( file_path_excel, 'w') as zipObj2:
                    # Add multiple files to the zip
                    zipObj2.write(file_path_docx)
                    zipObj2.write(file_path_xls)
                    # zipObj2.write('test_2.log')
                f = open(file_path_excel, 'rb')
                File1 = File(f)
                response = HttpResponse(File1.read(), content_type="application/zip" )
                response['Content-Disposition'] = 'attachment;'
                f.close()
                os.remove(file_path_docx)
                os.remove(file_path_xls)
                os.remove(file_path_excel)

                # os.remove(file_path)
                return response   
            elif volume==True and value== False:
                report=countryvolume.reportmakedownedityear(toc," ",reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                file_path_docx = os.getcwd() +'/'+ report[0]
                file_path_xls = os.getcwd() +'/'+ report[1]
                file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                with ZipFile( file_path_excel, 'w') as zipObj2:
                    # Add multiple files to the zip
                    zipObj2.write(file_path_docx)
                    zipObj2.write(file_path_xls)
                    # zipObj2.write('test_2.log')
                f = open(file_path_excel, 'rb')
                File1 = File(f)
                response = HttpResponse(File1.read(), content_type="application/zip" )
                response['Content-Disposition'] = 'attachment;'
                f.close()
                os.remove(file_path_docx)
                os.remove(file_path_xls)
                os.remove(file_path_excel)

                # os.remove(file_path)
                return response   
            elif volume==True and value== True:
                report=countryvaluewithvol.reportmakedownedityear(toc," ",reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                file_path_docx = os.getcwd() +'/'+ report[0]
                file_path_xls = os.getcwd() +'/'+ report[1]
                file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                with ZipFile( file_path_excel, 'w') as zipObj2:
                    # Add multiple files to the zip
                    zipObj2.write(file_path_docx)
                    zipObj2.write(file_path_xls)
                    # zipObj2.write('test_2.log')
                f = open(file_path_excel, 'rb')
                File1 = File(f)
                response = HttpResponse(File1.read(), content_type="application/zip" )
                response['Content-Disposition'] = 'attachment;'
                f.close()
                os.remove(file_path_docx)
                os.remove(file_path_xls)
                os.remove(file_path_excel)

                # os.remove(file_path)
                return response   
                
        elif geography=="Regional":
            if volume==False and value== True:
                if "year" in request.data.keys():
                    if request.data["country"]=="":
                        report=regionvalue.reportmakedownedityear(toc," ",market,reportname,valueunit,tablesplit,request.data["year"],startyear,endyear,geography)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    else:
                        report=countryvalue.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                else:
                    report=countryvalue.reportmakedownedit(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,startyear,endyear)
                    file_path_docx = os.getcwd() +'/'+ report[0]
                    file_path_xls = os.getcwd() +'/'+ report[1]
                    file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                    with ZipFile( file_path_excel, 'w') as zipObj2:
                        # Add multiple files to the zip
                        zipObj2.write(file_path_docx)
                        zipObj2.write(file_path_xls)
                        # zipObj2.write('test_2.log')
                    f = open(file_path_excel, 'rb')
                    File1 = File(f)
                    response = HttpResponse(File1.read(), content_type="application/zip" )
                    response['Content-Disposition'] = 'attachment;'
                    f.close()
                    os.remove(file_path_docx)
                    os.remove(file_path_xls)
                    os.remove(file_path_excel)

                    # os.remove(file_path)
                    return response     


            elif volume==True and value== False:
                if "year" in request.data.keys():
                    if request.data["country"]=="":
                        report=regionvolume.reportmakedownedityear(toc,market,reportname,valueunit,tablesplit,request.data["year"],startyear,endyear,geography)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    else:
                        report=countryvolume.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response     
                else:
                    report=countryvolume.reportmakedownedit(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,startyear,endyear)
                    file_path_docx = os.getcwd() +'/'+ report[0]
                    file_path_xls = os.getcwd() +'/'+ report[1]
                    file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                    with ZipFile( file_path_excel, 'w') as zipObj2:
                        # Add multiple files to the zip
                        zipObj2.write(file_path_docx)
                        zipObj2.write(file_path_xls)
                        # zipObj2.write('test_2.log')
                    f = open(file_path_excel, 'rb')
                    File1 = File(f)
                    response = HttpResponse(File1.read(), content_type="application/zip" )
                    response['Content-Disposition'] = 'attachment;'
                    f.close()
                    os.remove(file_path_docx)
                    os.remove(file_path_xls)
                    os.remove(file_path_excel)

                    # os.remove(file_path)
                    return response      

            elif volume==True and value== True:
                if "year" in request.data.keys():
                    if request.data["country"]=="":
                        report=regionvaluewithvol.reportmakedownedityear(toc,"",market,reportname,valueunit,volumeunit,tablesplit,request.data["year"],startyear,endyear,geography)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    else:
                        report=countryvaluewithvol.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                else:
                    report=countryvaluewithvol.reportmakedownedit(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,startyear,endyear)
                    file_path_docx = os.getcwd() +'/'+ report[0]
                    file_path_xls = os.getcwd() +'/'+ report[1]
                    file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                    with ZipFile( file_path_excel, 'w') as zipObj2:
                        # Add multiple files to the zip
                        zipObj2.write(file_path_docx)
                        zipObj2.write(file_path_xls)
                        # zipObj2.write('test_2.log')
                    f = open(file_path_excel, 'rb')
                    File1 = File(f)
                    response = HttpResponse(File1.read(), content_type="application/zip" )
                    response['Content-Disposition'] = 'attachment;'
                    f.close()
                    os.remove(file_path_docx)
                    os.remove(file_path_xls)
                    os.remove(file_path_excel)

                    # os.remove(file_path)
                    return response            
        
        elif geography=="Global":
            if request.data["year"] != None:
                if "region" in request.data.keys():
                    if volume==False and value== True:
                        report=regionvalue.reportmakedownedityear(toc,request.data["region"],request.data["region"],reportname,valueunit,tablesplit,request.data["year"],startyear,endyear,geography)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    elif volume==True and value== False:
                        report=regionvolume.reportmakedownedityear(toc,request.data["region"],request.data["region"],reportname,volumeunit,tablesplit,request.data["year"],startyear,endyear,geography)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    
                    elif volume==True and value== True:
                        report=regionvaluewithvol.reportmakedownedityear(toc,request.data["region"],request.data["region"],reportname,valueunit,volumeunit,tablesplit,request.data["year"],startyear,endyear,geography)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   

                elif "country" in request.data.keys():
                    if volume==False and value== True:
                        report=countryvalue.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    
                    elif volume==True and value== False:
                        report=countryvolume.reportmakedownedityear(toc,request.data["country"],reportname,volumeunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    
                    elif volume==True and value== True:
                        report=countryvaluewithvol.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,volumeunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   


            else:
                if "country" in request.data.keys() and request.data["country"] != "":
                    if volume==False and value== True:
                        report=countryvalue.reportmakedownedit(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    elif volume==True and value== False:
                        report=countryvolume.reportmakedownedit(toc,request.data["country"],reportname,volumeunit,geography,regdet,tablesplit,startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    elif volume==True and value== False:
                        report=countryvaluewithvol.reportmakedownedit(toc,request.data["country"],reportname,valueunit,volumeunit,geography,regdet,tablesplit,startyear,endyear)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                elif "region" in request.data.keys():
                    if volume==False and value== True:
                        report=regionvalue.reportmakedownedit(toc,request.data["region"],request.data["region"],reportname,valueunit,startyear,endyear,tablesplit)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    elif volume==True and value== False:
                        report=regionvolume.reportmakedownedit(toc,request.data["region"],request.data["region"],reportname,volumeunit,startyear,endyear,tablesplit)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    elif volume==True and value== True:
                        report=regionvaluewithvol.reportmakedownedit(toc,request.data["region"],request.data["region"],reportname,valueunit,volumeunit,startyear,endyear,tablesplit)
                        file_path_docx = os.getcwd() +'/'+ report[0]
                        file_path_xls = os.getcwd() +'/'+ report[1]
                        file_path_excel=os.getcwd() +'/'+reportname+'.zip'
                        with ZipFile( file_path_excel, 'w') as zipObj2:
                            # Add multiple files to the zip
                            zipObj2.write(file_path_docx)
                            zipObj2.write(file_path_xls)
                            # zipObj2.write('test_2.log')
                        f = open(file_path_excel, 'rb')
                        File1 = File(f)
                        response = HttpResponse(File1.read(), content_type="application/zip" )
                        response['Content-Disposition'] = 'attachment;'
                        f.close()
                        os.remove(file_path_docx)
                        os.remove(file_path_xls)
                        os.remove(file_path_excel)

                        # os.remove(file_path)
                        return response   
                    





                


            

        



                
                        

            











        
        # if volume==False and value== True and request.data["region"]!="" :
        #     if request.data["year"]==None:
        #         report=regionvalue.reportmakedownedit(toc,request.data["region"],request.data["region"],reportname,valueunit,startyear,endyear,tablesplit)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         File1 = File(f)
        #         response = HttpResponse(File1.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         return response
        #     else:
        #         # report=regionvalue.reportmakedownedityear(toc,request.data["region"],reportname,valueunit,tablesplit,request.data["year"],startyear,endyear)
        #         report=regionvalue.reportmakedownedityear(toc,request.data["region"],request.data["region"],reportname,valueunit,tablesplit,request.data["year"],startyear,endyear)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         return response

        
        # elif volume==True and value== False and request.data["region"]!="" :
        #     if request.data["year"]==None:
        #         report=regionvolume.reportmakedownedit(toc,request.data["region"],request.data["region"],reportname,volumeunit)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response

        # elif  volume==True and value== True and request.data["region"]!="":
        #     if request.data["year"]==None:
        #         report=regionvaluewithvol.reportmakedownedit(toc,request.data["region"],request.data["region"],reportname,valueunit,volumeunit)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response
            

        # elif volume==False and value== True and request.data["country"]!="" :
        #     if request.data["year"]==None:
        #         report=countryvalue.reportmakedownedit(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,startyear,endyear)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response   
            
        #     else:
        #         report=countryvalue.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response   
        
        # elif volume==True and value== False and request.data["country"]!="" :
        #     if request.data["year"]==None:
        #         report=countryvolume.reportmakedownedit(toc,request.data["country"],reportname,volumeunit)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response  

        #     else:
        #         report=countryvolume.reportmakedownedityear(toc,request.data["country"],reportname,volumeunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response    

        # elif volume==True and value== True and request.data["country"]!="" :
        #     if request.data["year"]==None:
        #         report=countryvaluewithvol.reportmakedownedit(toc,request.data["country"],reportname,valueunit)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response 

        #     else:
        #         report=countryvaluewithvol.reportmakedownedityear(toc,request.data["country"],reportname,valueunit,volumeunit,geography,regdet,tablesplit,request.data["year"],startyear,endyear)
        #         file_path = os.getcwd() +'/'+ report
        #         f = open(file_path, 'rb')
        #         pdfFile = File(f)
        #         response = HttpResponse(pdfFile.read(), content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" )
        #         response['Content-Disposition'] = 'attachment;'
        #         f.close()
        #         os.remove(file_path)
        #         # os.remove(file_path)
        #         return response  

    



def autopopulate(split):
    j={k: v for k, v in sorted(split.items(), key=lambda item: item[1])}
    lst1={}
    x=0
    sm=0
    key=list(j.keys())
    for k in range(len(j)):
        keyin=key[k]
        val=j[keyin]
        ran=random.uniform(-val/200,val/200)
        lst1[keyin]=val+ran
        sm+=val+ran
    if sm!=100.0:
        if sm>100.0:
            diff=(sm-100.0)/len(j)
            for k in range(len(j)):
                val1=lst1[key[k]]-diff
                if val1>0:
                    lst1[key[k]]=val1
                else:
                    continue

        else :
            diff=(100.0-sm)/len(j)
            for k in range(len(j)):
                lst1[key[k]]=(lst1[key[k]]+diff)
    return(lst1)
            
            
            
@api_view([ 'POST'])
@permission_classes((AllowAny, ))
def autogenrate(request):
    data=request.data
    lis=[]
    toc=data["toc"]
    if data["value"]==True and data["volume"]==False:
        for num in range(data["noc"]):
            lis1=[]
            for tc1 in toc :
                toc1={}
                toccomp=[]
                toc1["toc_name"]=tc1["toc_name"]
                stspttoc2={}
                enspttoc2={}
                for tc2 in tc1["toc_component"]:
                    toc2={}
                    toc2["toc2_name"]=tc2["toc2_name"]
                    stspttoc2[tc2["toc2_name"]]=float(str(tc2["split"][0]).replace("%",""))
                    enspttoc2[tc2["toc2_name"]]=float(str(tc2["split"][1]).replace("%",""))
                    if tc2["toc2_component"]!=[]:
                        toc2["toc2_component"]=[]
                        stspttoc3={}
                        enspttoc3={}
                        for tc3 in tc2["toc2_component"]:
                            toc3={}
                            toc3["toc3_name"]=tc3["toc3_name"]
                            stspttoc3[tc3["toc3_name"]]=float(str(tc3["split"][0]).replace("%",""))
                            enspttoc3[tc3["toc3_name"]]=float(str(tc3["split"][1]).replace("%",""))
                            if tc3["toc3_component"]!=[]:
                                print("!111")
                                toc3["toc3_component"]=[]
                                stspttoc4={}
                                enspttoc4={}
                                for tc4 in tc3["toc3_component"]:
                                    toc4={}
                                    toc4["toc4_name"]=tc4["toc4_name"]
                                    stspttoc4[tc4["toc4_name"]]=float(str(tc4["split"][0]).replace("%",""))
                                    enspttoc4[tc4["toc4_name"]]=float(str(tc4["split"][1]).replace("%",""))
                                    toc3["toc3_component"].append(toc4)
                                k2=autopopulate(stspttoc4)
                                p2=autopopulate(enspttoc4)
                                # print(k2,p2)
                                
                                print(toc3["toc3_component"])
                                for a in toc3["toc3_component"]:
                                    # print("11111")
                                    a["split"]=[k2[a["toc4_name"]],p2[a["toc4_name"]]]
                                    # print(a)

                            else:
                                toc3["toc3_component"]=[]
                            toc2["toc2_component"].append(toc3)
                        k1=autopopulate(stspttoc3)
                        p1=autopopulate(enspttoc3)
                        for a in toc2["toc2_component"]:
                            a["split"]=[k1[a["toc3_name"]],p1[a["toc3_name"]]]
                    else:
                        toc2["toc2_component"]=[]
                    toccomp.append(toc2)

                toc1["toc_component"]=toccomp
                k=autopopulate(stspttoc2)
                p=autopopulate(enspttoc2)
                for a in toccomp:
                    a["split"]=[k[a["toc2_name"]],p[a["toc2_name"]]]
                # print(toc1) 

                lis1.append(toc1)
            lis.append(lis1)
    
    elif data["value"]==False and data["volume"]==True:
        for num in range(data["noc"]):
            lis1=[]
            for tc1 in toc :
                toc1={}
                toccomp=[]
                toc1["toc_name"]=tc1["toc_name"]
                stspttoc2={}
                enspttoc2={}
                for tc2 in tc1["toc_component"]:
                    toc2={}
                    toc2["toc2_name"]=tc2["toc2_name"]
                    stspttoc2[tc2["toc2_name"]]=float(str(tc2["vsplit"][0]).replace("%",""))
                    enspttoc2[tc2["toc2_name"]]=float(str(tc2["vsplit"][1]).replace("%",""))
                    if tc2["toc2_component"]!=[]:
                        toc2["toc2_component"]=[]
                        stspttoc3={}
                        enspttoc3={}
                        for tc3 in tc2["toc2_component"]:
                            toc3={}
                            toc3["toc3_name"]=tc3["toc3_name"]
                            stspttoc3[tc3["toc3_name"]]=float(str(tc3["vsplit"][0]).replace("%",""))
                            enspttoc3[tc3["toc3_name"]]=float(str(tc3["vsplit"][1]).replace("%",""))
                            if tc3["toc3_component"]!=[]:
                                toc3["toc3_component"]=[]
                                stspttoc4={}
                                enspttoc4={}
                                for tc4 in tc3["toc3_component"]:
                                    toc4={}
                                    toc4["toc4_name"]=tc4["toc4_name"]
                                    stspttoc4[tc4["toc4_name"]]=float(str(tc4["vsplit"][0]).replace("%",""))
                                    enspttoc4[tc4["toc4_name"]]=float(str(tc4["vsplit"][1]).replace("%",""))
                                    toc3["toc3_component"].append(toc4)
                                k2=autopopulate(stspttoc4)
                                p2=autopopulate(enspttoc4)
                                for a in toc3["toc3_component"]:
                                    a["vsplit"]=[k2[a["toc4_name"]],p2[a["toc4_name"]]]

                            else:
                                toc3["toc3_component"]=[]
                            toc2["toc2_component"].append(toc3)
                        k1=autopopulate(stspttoc3)
                        p1=autopopulate(enspttoc3)
                        for a in toc2["toc2_component"]:
                            a["vsplit"]=[k1[a["toc3_name"]],p1[a["toc3_name"]]]
                    else:
                        toc2["toc2_component"]=[]
                    toccomp.append(toc2)

                toc1["toc_component"]=toccomp
                k=autopopulate(stspttoc2)
                p=autopopulate(enspttoc2)
                for a in toccomp:
                    a["vsplit"]=[k[a["toc2_name"]],p[a["toc2_name"]]]
                # print(toc1) 

                lis1.append(toc1)
            lis.append(lis1)

    elif data["value"]==True and data["volume"]==True:
        for num in range(data["noc"]):
            lis1=[]
            for tc1 in toc :
                toc1={}
                toccomp=[]
                toc1["toc_name"]=tc1["toc_name"]
                stspttoc2={}
                enspttoc2={}
                stspttoc2vol={}
                enspttoc2vol={}
                for tc2 in tc1["toc_component"]:
                    toc2={}
                    toc2["toc2_name"]=tc2["toc2_name"]
                    stspttoc2[tc2["toc2_name"]]=float(str(tc2["split"][0]).replace("%",""))
                    enspttoc2[tc2["toc2_name"]]=float(str(tc2["split"][1]).replace("%",""))
                    stspttoc2vol[tc2["toc2_name"]]=float(str(tc2["vsplit"][0]).replace("%",""))
                    enspttoc2vol[tc2["toc2_name"]]=float(str(tc2["vsplit"][1]).replace("%",""))
                    if tc2["toc2_component"]!=[]:
                        toc2["toc2_component"]=[]
                        stspttoc3={}
                        enspttoc3={}
                        stspttoc3vol={}
                        enspttoc3vol={}
                        for tc3 in tc2["toc2_component"]:
                            toc3={}
                            toc3["toc3_name"]=tc3["toc3_name"]
                            stspttoc3[tc3["toc3_name"]]=float(str(tc3["split"][0]).replace("%",""))
                            enspttoc3[tc3["toc3_name"]]=float(str(tc3["split"][1]).replace("%",""))
                            stspttoc3vol[tc3["toc3_name"]]=float(str(tc3["vsplit"][0]).replace("%",""))
                            enspttoc3vol[tc3["toc3_name"]]=float(str(tc3["vsplit"][1]).replace("%",""))
                            if tc3["toc3_component"]!=[]:
                                toc3["toc3_component"]=[]
                                stspttoc4={}
                                enspttoc4={}
                                stspttoc4vol={}
                                enspttoc4vol={}
                                for tc4 in tc3["toc3_component"]:
                                    toc4={}
                                    toc4["toc4_name"]=tc4["toc4_name"]
                                    stspttoc4[tc4["toc4_name"]]=float(str(tc4["split"][0]).replace("%",""))
                                    enspttoc4[tc4["toc4_name"]]=float(str(tc4["split"][1]).replace("%",""))
                                    stspttoc4vol[tc4["toc4_name"]]=float(str(tc4["vsplit"][0]).replace("%",""))
                                    enspttoc4vol[tc4["toc4_name"]]=float(str(tc4["vsplit"][1]).replace("%",""))
                                    toc3["toc3_component"].append(toc4)
                                k2=autopopulate(stspttoc4)
                                p2=autopopulate(enspttoc4)
                                k2vol=autopopulate(stspttoc4vol)
                                p2vol=autopopulate(enspttoc4vol)
                                for a in toc3["toc3_component"]:
                                    a["split"]=[k2[a["toc4_name"]],p2[a["toc4_name"]]]
                                    a["vsplit"]=[k2vol[a["toc4_name"]],p2vol[a["toc4_name"]]]

                            else:
                                toc3["toc3_component"]=[]
                            toc2["toc2_component"].append(toc3)
                        k1=autopopulate(stspttoc3)
                        p1=autopopulate(enspttoc3)
                        k1vol=autopopulate(stspttoc3vol)
                        p1vol=autopopulate(enspttoc3vol)
                        for a in toc2["toc2_component"]:
                            a["split"]=[k1[a["toc3_name"]],p1[a["toc3_name"]]]
                            a["vsplit"]=[k1vol[a["toc3_name"]],p1vol[a["toc3_name"]]]
                    else:
                        toc2["toc2_component"]=[]
                    toccomp.append(toc2)

                toc1["toc_component"]=toccomp
                k=autopopulate(stspttoc2)
                p=autopopulate(enspttoc2)
                kvol=autopopulate(stspttoc2vol)
                pvol=autopopulate(enspttoc2vol)
                for a in toccomp:
                    a["split"]=[k[a["toc2_name"]],p[a["toc2_name"]]]
                    a["vsplit"]=[kvol[a["toc2_name"]],pvol[a["toc2_name"]]]
                # print(toc1) 

                lis1.append(toc1)
            lis.append(lis1)
       
    return Response(data=lis)