package org.fundacionjala.contacts.controllers;

import org.fundacionjala.contacts.JsonSerializerHelper;
import org.fundacionjala.contacts.db.entities.ContactData;
import org.fundacionjala.contacts.repository.ContactRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashSet;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ContactControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactRepository contactRepository;

    @Test
    public void shouldReturnOkStatusWhenRetrievingAllContacts() throws Exception {
        mockMvc.perform(get("/contacts"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void shouldReturnOkStatusWhenRetrievingContactById() throws Exception {

        ContactData contact = new ContactData(1L, 1L, "Lisa", "lisa@test.com",123345678, new HashSet<>());

        when(contactRepository.findById(any(Long.class))).thenReturn(Optional.of(contact));

        mockMvc.perform(get("/contacts/{id}", 1L))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.userId", is(1)))
                .andExpect(jsonPath("$.name", is("Lisa")))
                .andExpect(jsonPath("$.email", is("lisa@test.com")));
    }

    @Test
    public void shouldReturnBadRequestWhenEmailIsEmptyForNewContact() throws Exception {
        ContactData contact = new ContactData(1L, 1L, "Lisa", "",123345678, new HashSet<>());

        mockMvc.perform(
                        post("/contacts")
                                .contentType("application/json")
                                .content(JsonSerializerHelper.toJson(contact)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(
                        r -> assertThat(r.getResolvedException().getMessage())
                                .contains("Field 'email' is required."));
    }

    @Test
    public void shouldReturnBadRequestWhenEmailIsDuplicatedForNewContact() throws Exception {
        ContactData contactLisa = new ContactData(1L, 1L, "Lisa", "lisa@test.com",123345678, new HashSet<>());
        ContactData contactMaggie = new ContactData(2L, 1L, "Maggie", "lisa@test.com",123345678, new HashSet<>());

        when(contactRepository.findByEmail(any(String.class))).thenReturn(Optional.of(contactLisa));

        mockMvc.perform(
                        post("/contacts")
                                .contentType("application/json")
                                .content(JsonSerializerHelper.toJson(contactMaggie)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(
                        r -> assertThat(r.getResolvedException().getMessage())
                                .contains("duplicated email"));
    }

    @Test
    public void shouldReturnBadRequestWhenContactNameIsEmptyForNewContact() throws Exception {
        ContactData contact = new ContactData(1L, 1L, "", "lisa@test.com", 123345678,new HashSet<>());

        mockMvc.perform(
                        post("/contacts")
                                .contentType("application/json")
                                .content(JsonSerializerHelper.toJson(contact)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andExpect(
                        r -> assertThat(r.getResolvedException().getMessage())
                                .contains("Field 'name' is required."));
    }

    @Test
    public void shouldReturnNotFoundWhenNonExistingContactIsRequested() throws Exception {
        when(contactRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        mockMvc.perform(get("/contacts/{id}", 1L))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(
                        r -> assertThat(r.getResolvedException().getMessage())
                                .contains("Unable to find contact with Id: 1"));
    }

    @Test
    public void shouldReturnOkWhenSavingContact() throws Exception {
        ContactData contact = new ContactData(1L, 1L, "Lisa", "lisa@test.com",123345678, new HashSet<>());

        when(contactRepository.save(any(ContactData.class))).thenReturn(contact);

        mockMvc.perform(
                        post("/contacts")
                                .contentType("application/json")
                                .content(JsonSerializerHelper.toJson(contact)))
                .andDo(print())
                .andExpect(status().isOk());
    }



}
